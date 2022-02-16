import { NextFunction, Request, Response } from 'express';
import jwt from 'jwt-simple'
import httpStatus from 'http-status';
import HttpException from '../exceptions/HttpException';

interface ILogin {
    username: string,
    password: string
}

const LoginController = async (request: Request, response: Response, next: NextFunction) => {
    console.log("login")
    const jwtsign = process.env.JWT_SECRET as string

    const body = request.body as ILogin
    console.log(body.username)
    //TODO: Integration with login Service
    if (body.username == "admin" && body.password == "admin") {
        try {
            const token = jwt.encode({ username: body.username }, jwtsign, 'HS256')
            response.json({ apikey: token })
        } catch (error) {
            response.status(httpStatus.UNAUTHORIZED).json(new HttpException(httpStatus.UNAUTHORIZED, { code: "ERROR1000", message: "Error trying to encode the token :(" }))
        }

    }
    else response.status(httpStatus.UNAUTHORIZED).json(new HttpException(httpStatus.UNAUTHORIZED, { code: "ERROR1000", message: "Wrong user!" }))
}

export default LoginController