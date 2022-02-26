import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';

import EmailController from './controllers/EmailController';
import { checkJwt } from './utils/checkJwt';
import { consumeRabbitMQ } from './services/rabbitmq';


const app = express();
dotEnv.config();
app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT;

consumeRabbitMQ()

app.listen(PORT, () => {
    console.log(`Email server started at port: ${PORT}`);
});