import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';

import EmailController from './controllers/EmailController';


const app = express();
dotEnv.config();
app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT;

app.post('/emails', EmailController)

app.listen(PORT, () => {
    console.log(`Email server started at port: ${PORT}`);
});