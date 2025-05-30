import { fetchTransactions, insertTransaction, deleteTransaction } from "../models/transactionModel.js";

const getTransactions = async (req, res) => {
    // console.log(`Body: ${req.body.id}`);
    // console.log(req.query);
    const userId = req.query.id;
    const result = await fetchTransactions(userId);
    console.log(result);
    res.json(result);
}

const addTransaction = async (req, res) => {
    let body = req.body;
    if (!body.amount || !body.category || !body.user_id)     
        res.status(400).send({'msg': 'Invalid transaction.'});
    let data = {
        amount: parseFloat(body.amount),
        receiver: body.receiver,
        category: body.category,
        payment_method: body.payment_method,
        description: body.description,
        user_id: parseInt(body.user_id),
    }
    let result = await insertTransaction(data);
    res.status(200).send({'msg': 'Transaction successfully added.'});
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