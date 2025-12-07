import jwt from 'jsonwebtoken';
import { redisClient } from '../index.js';

export const generateToken = async (id, res) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, {
        expiresIn: '7d',
    });

    const refreshTokenKey = `refresh_Token:${id}`;
    await redisClient.setEx(refreshTokenKey, 7 * 24 * 60 * 60, refreshToken); 

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        //secure: true,
        sameSite: 'Strict',
        maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        //secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { accessToken, refreshToken };
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
        return decodedData;
    } catch (error) {
        return null;
    }
}   

export const generateAccessToken = (id, res) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        //secure: true,
        sameSite: 'Strict',
        maxAge: 15 * 60 * 1000,
    });
}

export const revokeTokens = async (id) => {
    const refreshTokenKey = `refresh_Token:${id}`;
    await redisClient.del(refreshTokenKey);
}