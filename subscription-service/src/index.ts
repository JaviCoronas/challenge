import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import { subscriptionRoutes } from './routes/subscriptionRoutes';


const app = express();
dotEnv.config();
app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT;

app.use(subscriptionRoutes)

app.listen(PORT, () => {
    console.log(`Subscription server started at port: ${PORT}`);
});