import pool from '../db/index.js';

const fetchTransactions = async (userId) => {
    try {
        const result = await pool.query(`SELECT timestamp, amount, receiver, category, payment_method, description FROM transactions WHERE user_id=$1`, [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error fecthing transactions: ', error);
    }
}

const insertTransaction = async (obj) => {
    try {
        const result = await pool.query(
            'INSERT INTO transactions (amount, receiver, category, payment_method, description, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
             [obj.amount, obj.receiver, obj.category, obj.payment_method, obj.description, obj.user_id]);
        console.log('Transaction successfully inserted.')
        return result;
    } catch (error) {
        console.error('Error in inserting into database.: ', error);
    }
}

const deleteTransaction = async (transactionId) => {
    try {
        await pool.query('DELETE FROM transactions WHERE id = $1', [transactionId]);
        console.log('Transaction deleted successfully.');
    } catch (error) {
        console.error('Error in deleting from database: ', error);
    }
}

export {fetchTransactions, insertTransaction, deleteTransaction};