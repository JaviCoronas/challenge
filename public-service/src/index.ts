import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import helmet from 'helmet';

import HeathCheckController from './controllers/HeathController';
import LoginController from './controllers/LoginController';
import { subscriptionRoutes } from './routes/subscriptionRoutes';


const app = express();
dotEnv.config();
app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.get('/health-check', HeathCheckController)
app.post('/login', LoginController)
app.use(subscriptionRoutes)

app.listen(PORT, () => {
    console.log(`Public server started at port: ${PORT}`);
});