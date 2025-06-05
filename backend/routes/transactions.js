import express from "express";
import { getTransactions, addTransaction, removeTransaction } from "../controllers/transactionController.js";
import { verifyToken } from "../middlewares/authenticate.middleware.js";

const transactionRouter = express.Router();
transactionRouter.get('/', verifyToken, getTransactions);
transactionRouter.post('/', verifyToken, addTransaction);
transactionRouter.delete('/', verifyToken, removeTransaction);

export default transactionRouter;