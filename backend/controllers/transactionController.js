import { fetchTransactions, insertTransaction, deleteTransaction } from "../models/transactionModel.js";

const getTransactions = async (req, res) => {
    const userId = req.user.userId;
    const result = await fetchTransactions(userId);
    res.json(result);
}

const addTransaction = async (req, res) => {
    const userId = req.user.userId;
    let body = req.body;
    if (!body.amount || !body.category || userId)     
        return res.status(400).json({'msg': 'Invalid transaction.'});
    let data = {
        amount: parseFloat(body.amount),
        receiver: body.receiver,
        category: body.category,
        payment_method: body.payment_method,
        description: body.description,
        user_id: parseInt(userId),
    }
    let result = await insertTransaction(data);
    res.status(200).json({'msg': 'Transaction successfully added.'});
}

const removeTransaction = async (req, res) => {
    let transactionId = parseInt(req.body.id);
    try {
        let result = await deleteTransaction(transactionId);
        res.status(200).json({'msg': 'Transaction successfully deleted.'});
    } catch (error) {
        res.status(500).send({'msg': 'Error in deleting transaction.'});
    }
}

export {getTransactions, addTransaction, removeTransaction};