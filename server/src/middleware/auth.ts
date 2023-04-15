import { NextFunction, Response, Request} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

// create an interface that extends Request
interface CustomRequest extends Request {
    user?: any;
}

// an arrow function to handle authenticated
export const authenticate = (
    req: CustomRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const headerAuth = req.headers['authorization'];

        // check if the headerAuth is exist
        if (headerAuth) {
            const token = headerAuth.split(' ')[1];
            const bearer = headerAuth.split(' ')[0].toLowerCase();
            if (token && bearer === 'bearer') {
                const decoded: string | JwtPayload = jwt.verify(token, config.jwt_secret_access);
                if (!decoded) {
                    res.status(401).json({
                        message: 'invalid token'
                    });
                    next();
                }else{
                    req.user = decoded;
                    next();
                }
            } else{
                // not a bearer token 
                res.status(401).json({
                    message: 'not a bearer'
                });
                next();
            }
        }else{
            // no token provided
           res.status(401).json({
                message: "no token provided"
            });
            next();
        }       
    } catch (error) {
        throw new Error(`authenticate ${(error as Error).message}`);
        
    }
};
;
