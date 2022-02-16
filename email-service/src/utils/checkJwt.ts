import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jwt from 'jwt-simple'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization as string || ""
    const token = header.split(' ').pop() || ""
    const jwtsign = process.env.JWT_SECRET as string

    //Try to validate the token and get data
    try {
        jwt.decode(token, jwtsign, true, 'HS256')
        next()
    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).send();
        return;
    }
}
