import express from 'express';
import bodyParser from 'body-parser';
import { json } from 'express';
import cors from 'cors'
import transactionRouter from './routes/transactions.js';
import analysisRouter from './routes/analysis.js';
import incomeRouter from './routes/income.js';
import userRouter from './routes/user.js';
import expenseRouter from './routes/expense.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import { loginUser } from './controllers/userController.js';
import cookieParser from 'cookie-parser';
import logoutRouter from './routes/logout.js';


const app = express();
const port = 8000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`);
})

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/transactions', transactionRouter);
app.use('/analysis', analysisRouter);
app.use('/income', incomeRouter);
app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/register',registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter)