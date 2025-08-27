import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { StringValue } from "ms";

const secretKey = config.jwtSecretKey;
const accessTokenExpireTime = config.jwtExpireTime as  StringValue | number;
const refreshTokenExpireTime = config.refreshExpireTime as  StringValue | number;
interface CustomRequest extends Request {
    token?: string;
}

export function signJwt(object: Object, options?: jwt.SignOptions) {
    return jwt.sign(object, secretKey, {
        ...(options && options),
        expiresIn: accessTokenExpireTime,
    });
}

export function signRefreshJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, secretKey, {
        ...(options && options),
        expiresIn: refreshTokenExpireTime,
    });
}

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader === "string") {
        req.token = bearerHeader.split(" ")[1];
        try {
            const verifyToken: any = await jwt.verify(req.token, secretKey);
            if (verifyToken) {
                next();
            }
        } catch (error) {
            res.status(401).send({ status: false, code: 401, message: "TokenExpiredError" });
        }
    } else {
        res.status(404).send({ status: false, message: "Token not found in headers" });
    }
};

export function verifyTokenInviteUser(token: string) {
   return jwt.verify(token, secretKey) as any;
}