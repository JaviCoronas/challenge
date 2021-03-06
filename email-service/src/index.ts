import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';

import EmailController from './controllers/EmailController';
import { checkJwt } from './utils/checkJwt';


const app = express();
dotEnv.config();
app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT;

app.post('/emails', checkJwt, EmailController)

app.listen(PORT, () => {
    console.log(`Email server started at port: ${PORT}`);
});