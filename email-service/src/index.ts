import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';


const app = express();
dotEnv.config();
app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Email server started at port: ${PORT}`);
});