import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jwt from 'jwt-simple'
import HttpException from "../exceptions/HttpException";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization as string || ""
    const token = header.split(' ').pop() || ""
    const jwtsign = process.env.JWT_SECRET as string

    //Try to validate the token and get data
    try {
        if (token.length == 0)
            res.status(httpStatus.UNAUTHORIZED).json(new HttpException(httpStatus.UNAUTHORIZED, { code: "ERROR1003", message: "Dude, you need authorization to make this" }))
        jwt.decode(token, jwtsign, true, 'HS256')
        next()
    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).json(new HttpException(httpStatus.UNAUTHORIZED, { code: "ERROR1002", message: "This token looks wrong :(" }))
        return;
    }
}

export const extractAuthHeader = (req: Request, res: Response, next: NextFunction) => {
    return req.headers.authorization
}