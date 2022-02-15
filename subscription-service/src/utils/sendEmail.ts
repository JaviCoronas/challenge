import axios from "axios";
import { Request } from "express";



export function sendEmail(request: Request) {
    axios({
        url: 'http://localhost:40002/emails',
        method: 'POST',
        headers: {
            'Authorization': request.headers.authorization || ''
        },
        data: request.body
    })
}