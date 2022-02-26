import express from 'express';
import dotEnv from 'dotenv';
import { consumeRabbitMQ } from './services/rabbitmq';


const app = express();
dotEnv.config();

const PORT = process.env.SERVER_PORT;

consumeRabbitMQ()

app.listen(PORT, () => {
    console.log(`Email server started at port: ${PORT}`);
});