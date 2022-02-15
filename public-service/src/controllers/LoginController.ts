import { Request, Response } from 'express';
import jwt from 'jwt-simple'
import httpStatus from 'http-status';

interface ILogin {
    username: string,
    password: string
}

const LoginController = async (request: Request, response: Response) => {
    console.log("login")
    const jwtsign = process.env.JWT_SECRET as string

    const body = request.body as ILogin
    console.log(body.username)
    //TODO: Integration with login Service
    if (body.username == "admin" && body.password == "admin") {
        const token = jwt.encode({ username: body.username }, jwtsign, 'HS256')
        response.json({ apikey: token })
    }
    else response.status(httpStatus.UNAUTHORIZED)
}

export default LoginController