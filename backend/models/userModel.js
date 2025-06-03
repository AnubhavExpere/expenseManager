import pool from '../db/index.js'

const fetchUserDetails = async (userId) => {
    try {
        const response = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        return response.rows;
    } catch (err) {
        console.log('Error fetching user details from database. \n', err);
    }
}

const fetchMonthlyIncomeByYear = async (userId, year) => {
    try {
        const response = await pool.query(`SELECT amount AS income, month FROM monthly_income WHERE user_id = $1 AND year = $2`, 
            [userId, year]);
        return response.rows;
    } catch (err) {
        console.log('Error fetching income data from database. \n', err);
    }
}

const fetchMonthlyExpenseByYear = async (userId, year) => {
    try {
        const response = await pool.query(
            `SELECT SUM(amount) AS expense, EXTRACT(MONTH FROM timestamp) AS month
            FROM transactions WHERE user_id = $1 AND EXTRACT(YEAR FROM timestamp) = $2
            GROUP BY month ORDER BY month`, 
        [userId, year]);
        return response.rows;
    } catch (err) {
        console.log('Error fetching monthly expenses from database. \n', err);
    }
}

const fetchIncomeByMonthYear = async (userId, month, year) => {
    try {
        const response = await pool.query(`SELECT amount AS income, month, year FROM monthly_income 
            WHERE user_id=$1 AND month=$2 AND year=$3`, [userId, month, year]);
        return response.rows;
    } catch (err) {
        console.log('Failed to fetch monthly income. \n', err);
    }
}

const fetchExpenseByMonthYear = async (userId, month, year) => {
    try {
        const response = await pool.query(`SELECT SUM(amount) as Expense, EXTRACT(MONTH FROM timestamp) as month FROM transactions 
                WHERE user_id=$1 AND EXTRACT(MONTH FROM timestamp)=$2 AND EXTRACT(YEAR FROM timestamp)=$3
                GROUP BY month`, [userId, month, year]);
        return response.rows;
    } catch (err) {
        console.log('Failed to fetch monthly expense. \n', err);
    }
}

export {fetchUserDetails, fetchMonthlyIncomeByYear, fetchMonthlyExpenseByYear, fetchIncomeByMonthYear, fetchExpenseByMonthYear};