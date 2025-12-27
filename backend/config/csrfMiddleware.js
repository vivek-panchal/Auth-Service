import crypto from 'crypto';
import { redisClient } from '../index.js';


export const generateCSRFToken = async(userId, res) => {
    const csrfToken = crypto.randomBytes(32).toString('hex');
    const csrfKey = `csrf:${userId}`;
    await redisClient.setEx(csrfKey, 60 * 60, csrfToken); 
    res.cookie('csrfToken', csrfToken, {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 1000,
    });
    return csrfToken;
};

export const verifyCSRFToken = async(req, res, next) => {
    try {
        if (req.method === 'GET' || req.method === 'OPTIONS') {
            return next();
        }
        
        const userId = req.user?._id; 
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // HTTP headers are normalized to lowercase by Express
        const clientToken = req.headers['x-csrf-token'] || req.headers['x-csrftoken'] || req.headers['x-xsrf-token'] || req.cookies?.csrfToken;

        if (!clientToken) {
            return res.status(403).json({ message: 'CSRF Token missing , Please refresh the page', code: 'CSRF_TOKEN_MISSING' });
        }
        const csrfKey = `csrf:${userId}`;
        const storedCsrfToken = await redisClient.get(csrfKey);
        if (!storedCsrfToken) {
            return res.status(403).json({ message: 'CSRF Token expired , Please try again', code: 'CSRF_TOKEN_EXPIRED' });
        }
        if (clientToken && storedCsrfToken && clientToken === storedCsrfToken) {
            return next();
        } else {
            return res.status(403).json({ message: 'Invalid CSRF Token, Please refresh the page', code: 'CSRF_TOKEN_INVALID' });
        }
    }
    catch (error) {
        console.error('Error verifying CSRF token:', error);
        return res.status(500).json({ message: 'CSRF Token verification failed', code: 'CSRF_VERIFICATION_FAILED' });
    }
};

export const revokeCSRFToken = async(userId) => {
    const csrfKey = `csrf:${userId}`;
    await redisClient.del(csrfKey);
};

export const refreshCSRFToken = async(userId, res) => {
    await revokeCSRFToken(userId);
    return await generateCSRFToken(userId, res);
};