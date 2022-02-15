import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import HeathCheckController from './controllers/HeathController';
import LoginController from './controllers/LoginController';
import { subscriptionRoutes } from './routes/subscriptionRoutes';


const app = express();
dotEnv.config();
app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT;

app.get('/health-check', HeathCheckController)
app.post('/login', LoginController)
app.use(subscriptionRoutes)

app.listen(PORT, () => {
    console.log(`Public server started at port: ${PORT}`);
});