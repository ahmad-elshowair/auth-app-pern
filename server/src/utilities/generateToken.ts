import * as jwt from 'jsonwebtoken';
import { UserPayload } from '../interfaces/user';

export const generateAccessToken = (payload: UserPayload, secret: string): string => {
    return jwt.sign(payload, secret, {expiresIn: "5s"});
};

export const generateRefreshToken = (payload: UserPayload, secret: string): string => {
    return jwt.sign(payload, secret);
};