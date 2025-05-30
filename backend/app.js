import express from 'express';
import bodyParser from 'body-parser';
import { json } from 'express';
import cors from 'cors'
import transactionRouter from './routes/transactions.js';

const app = express();
const port = 8000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`);
})

app.use(cors());
app.use(json());  
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/transactions', transactionRouter);

