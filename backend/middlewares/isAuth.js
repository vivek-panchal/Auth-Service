import jwt from 'jsonwebtoken';
import { redisClient } from '../index.js';
import User from '../models/User.js';
import { isSessionActive } from '../config/generateToken.js';

export const isAuth = async (req, res, next) => {
    
    try {
        const token = req.cookies.accessToken;
        if(!token) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedData) {
            return res.status(400).json({ message: 'Token Expired or Invalid' });
        }

        const sessionActive = await isSessionActive(decodedData.id, decodedData.sessionId);
        if(!sessionActive){
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.clearCookie('csrfToken');
            
            return  res.status(401).json({ message: 'Session is no longer active. Please log in again.' });
        }

        const cacheUser = await redisClient.get(`user:${decodedData.id}`);
        if(cacheUser) {
           req.user = JSON.parse(cacheUser);
           req.sessionId = decodedData.sessionId;
           return next();
        }

        const user = await User.findById(decodedData.id).select('-password');
        if(!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        await redisClient.setEx(`user:${user._id}`, 60 * 60, JSON.stringify(user));
        req.user = user;
        req.sessionId = decodedData.sessionId;

        next();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const authorizedAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(401).json({ message: 'Admin access required' });
    }
};