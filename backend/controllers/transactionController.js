import { fetchTransactions, insertTransaction, deleteTransaction, editTransactionById, bulkDeleteTransactionsByIds } from "../models/transactionModel.js";

const getTransactions = async (req, res) => {
    const userId = req.user.userId;
    const { from, to, category, payment_method } = req.query;

    try {
        const result = await fetchTransactions(userId, from, to, category, payment_method);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
}

const addTransaction = async (req, res) => {
    const userId = req.user.userId;
    const body = req.body;
    if (!body.amount || !body.category || !userId)     
        return res.status(400).json({'msg': 'Invalid transaction.'});
    const data = {
        amount: parseFloat(body.amount),
        receiver: body.receiver,
        category: body.category,
        payment_method: body.payment_method,
        description: body.description,
        user_id: parseInt(userId),
    }
    try {
        const result = await insertTransaction(data);
        res.status(201).json({'msg': 'Transaction successfully added.'});
    } catch (err) {
        console.error(err);
    }
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

const editTransaction = async (req, res) => {
    const userId = req.user.userId;
    const transactionId = req.params.id;

    let body = req.body;
    if (!transactionId || !body.amount || !body.category)     
        return res.status(400).json({'msg': 'Invalid transaction.'});

    let data = {
        id: parseInt(transactionId),
        amount: parseFloat(body.amount),
        receiver: body.receiver,
        category: body.category,
        payment_method: body.payment_method,
        description: body.description,
        timestamp: body.timestamp,
    }
    try {
        const result = await editTransactionById(data);
        if(result.length === 0)
            return res.status(404).json({message: "Transaction not found."})
        res.status(201).json({data: result[0], message: 'Transaction updated successfully.'});
    } catch (err) {
        console.error(err);   
        res.status(500).json({message: 'Transaction edit failed.'});
    }
}

const deleteTransactionsBulk = async (req, res) => {    
    const userId = req.user.userId;
    let { ids } = req.body;

    if(!Array.isArray(ids) || ids.length === 0)
        return res.status(400).json({error: 'No transaction selected.'})

    try {
        ids=ids.map(id => parseInt(id));
        const result = await bulkDeleteTransactionsByIds(userId, ids);
        res.status(200).json({ message: 'Transactions deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete transactions' });
  }
}

export {getTransactions, addTransaction, removeTransaction, editTransaction, deleteTransactionsBulk};