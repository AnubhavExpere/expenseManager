import pool from '../db/index.js';

const fetchTransactions = async (userId, from, to, category, payment_method) => {
    let query = `
        SELECT id, timestamp, amount, receiver, category, payment_method, description 
        FROM transactions WHERE user_id = $1 AND deleted=FALSE`;
    const values = [userId];

    if (from) {
        query += ` AND timestamp >= $${values.length + 1}`;
        values.push(from);
    }

    if (to) {
        //'to' has midnight of the day, so adding one day to 'to'
        const nextDay = new Date(to);
        nextDay.setDate(nextDay.getDate() + 1);
        query += ` AND timestamp < $${values.length + 1}`;
        values.push(nextDay.toISOString().split('T')[0]);
    }

    if (category) {
        query += ` AND category = $${values.length + 1}`;
        values.push(category);
    }

    if (payment_method) {
        query += ` AND payment_method = $${values.length + 1}`;
        values.push(payment_method);
    }

    query += ` ORDER BY timestamp DESC`;

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
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
        await pool.query('UPDATE transactions SET deleted=TRUE WHERE id = $1', [transactionId]);
        console.log('Transaction deleted successfully.');
    } catch (error) {
        console.error('Error in deleting from database: ', error);
    }
}

const editTransactionById = async (data) => {
    const {id, amount, receiver, category, payment_method, description, timestamp} = data;
    try {
        const response = await pool.query(`
            UPDATE transactions
            SET amount=$1, receiver=$2, category=$3, payment_method=$4, description=$5, timestamp=$6
            WHERE id=$7 RETURNING id, amount, receiver, category, payment_method, description, timestamp`,
            [amount,receiver,category,payment_method,description,timestamp,id]
        );
        return response.rows;
    } catch (err) {
        console.error('Failed to update transaction in database. \n', err);
    }
}

const bulkDeleteTransactionsByIds = async (userId, transactionIds) => {
    try {
        const response = await pool.query( `UPDATE transactions SET deleted=TRUE
            WHERE id = ANY($1::int[]) AND user_id = $2`,
            [transactionIds, userId]
        );
        return response;
    } catch (err) {
        console.error('Error bulk deleting transactions:', err);
    }
}

export {fetchTransactions, insertTransaction, editTransactionById, deleteTransaction, bulkDeleteTransactionsByIds};