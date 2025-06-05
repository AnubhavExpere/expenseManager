import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const generateAccessToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_JWT_EXPIRES_IN || '1d'
    });
    return token;
} 

const generateRefreshToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.RERESH_JWT_EXPIRES_IN || '7d'
    });
    return token;
}

export {generateAccessToken, generateRefreshToken};