import axios from "axios";
import { Request, Response } from "express";
import jwt from 'jwt-simple'



export function sendEmail(request: Request) {
    // Create valid token to send through http
    const jwtsign = process.env.JWT_SECRET as string
    const token = jwt.encode({ username: "email" }, jwtsign, 'HS256')
    axios({
        url: process.env.URL_EMAIL as string,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: request.body
    })
}