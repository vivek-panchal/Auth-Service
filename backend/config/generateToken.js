import jwt from 'jsonwebtoken';
import { redisClient } from '../index.js';
import { generateCSRFToken, revokeCSRFToken } from './csrfMiddleware.js';
import crypto from 'crypto';

export const generateToken = async (id, res) => {

    const sessionId = crypto.randomBytes(16).toString('hex');
    const accessToken = jwt.sign({ id, sessionId }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ id, sessionId }, process.env.REFRESH_SECRET, {
        expiresIn: '7d',
    });

    const refreshTokenKey = `refresh_Token:${id}`;
    const activeSessionKey = `active_session:${id}`;
    const sessionDataKey = `session:${sessionId}`;
    const existingSessionId = await redisClient.get(activeSessionKey);

    if (existingSessionId) {
        await redisClient.del(`session:${existingSessionId}`);
        await redisClient.del(refreshTokenKey);
    }

    const sessionData = {
        userId: id,
        sessionId,
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
    };
    await redisClient.setEx(sessionDataKey, 7 * 24 * 60 * 60, JSON.stringify(sessionData));
    await redisClient.setEx(refreshTokenKey, 7 * 24 * 60 * 60, refreshToken);
    await redisClient.setEx(activeSessionKey, 7 * 24 * 60 * 60, sessionId); // Store active session ID 

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const csrfToken = await generateCSRFToken(id, res);

    return { accessToken, refreshToken, csrfToken, sessionId };
}

export const verifyRefreshToken = async (token) => {
    try {
        const decodedData = jwt.verify(token, process.env.REFRESH_SECRET);
        if(!decodedData) {
            throw new Error('Invalid refresh token');
        }
        const refreshTokenKey = `refresh_Token:${decodedData.id}`;
        const storedToken = await redisClient.get(refreshTokenKey);
        if (storedToken !== token) {
            return null;
        }
        const activeSessionID =await redisClient.get(`active_session:${decodedData.id}`);
        if(activeSessionID !== decodedData.sessionId){
            return null;
        }

        const sessionData= await redisClient.get(`session:${decodedData.sessionId}`);
        if(!sessionData){
            return null;
        }

        const parsedSessionData = JSON.parse(sessionData);
        parsedSessionData.lastActivity = new Date().toISOString();
        await redisClient.setEx(`session:${decodedData.sessionId}`, 7 * 24 * 60 * 60, JSON.stringify(parsedSessionData));
        return decodedData;
    } catch (error) {
        return null;
    }
}   

export const generateAccessToken = (id, sessionId, res) => {
    const accessToken = jwt.sign({ id, sessionId }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 15 * 60 * 1000,
    });
}

export const revokeTokens = async (id) => {
    const activeSessionID = await redisClient.get(`active_session:${id}`);
    if(activeSessionID){
        const sessionKey = `session:${activeSessionID}`;
        await redisClient.del(sessionKey);
    }
    const refreshTokenKey = `refresh_Token:${id}`;
    await redisClient.del(refreshTokenKey);
    await redisClient.del(`active_session:${id}`);
    await revokeCSRFToken(id);
}

export const isSessionActive = async (id, sessionId) => {   
    const activeSessionID = await redisClient.get(`active_session:${id}`);
    return activeSessionID === sessionId;
}