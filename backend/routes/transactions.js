import express from "express";
import { getTransactions, addTransaction, removeTransaction, editTransaction, deleteTransactionsBulk } from "../controllers/transactionController.js";
import { verifyToken } from "../middlewares/authenticate.middleware.js";

const transactionRouter = express.Router();
transactionRouter.get('/', verifyToken, getTransactions);
transactionRouter.post('/', verifyToken, addTransaction);
transactionRouter.delete('/', verifyToken, removeTransaction);
transactionRouter.put('/:id', verifyToken,  editTransaction);
transactionRouter.delete('/bulk-delete', verifyToken, deleteTransactionsBulk);

export default transactionRouter;