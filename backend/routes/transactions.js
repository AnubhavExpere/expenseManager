import express from "express";
import { getTransactions, addTransaction, removeTransaction } from "../controllers/transactionController.js";

const transactionRouter = express.Router();
transactionRouter.get('/', getTransactions);
transactionRouter.post('/', addTransaction);
transactionRouter.delete('/', removeTransaction);

export default transactionRouter;