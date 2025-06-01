import express from 'express';
import bodyParser from 'body-parser';
import { json } from 'express';
import cors from 'cors'
import transactionRouter from './routes/transactions.js';
import analysisRouter from './routes/analysis.js';
import incomeRouter from './routes/income.js';
import userRouter from './routes/user.js';

const app = express();
const port = 8000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`);
})

app.use(cors());
app.use(json());  
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/transactions', transactionRouter);
app.use('/analysis', analysisRouter);
app.use('/income', incomeRouter);
app.use('/user', userRouter);

