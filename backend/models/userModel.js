import pool from '../db/index.js'

const insertUser = async (user) => {
    try {
        const response = await pool.query(`INSERT INTO users (first_name, last_name, phone, email, password, profile_photo_url)
            VALUES ($1, $2, $3, $4, $5, $6)`, 
            [user.first_name, user.last_name, user.phone, user.email, user.password, user.profile_photo_url]
        ); 
    } catch (err) {
        console.log('Failed to insert User into database. \n', err);
    }
}

const fetchUserByEmail = async (user) => {
    try {
        const response = await pool.query(`SELECT * FROM users WHERE email = $1 AND deleted=FALSE`, [user.email]);
        return response.rows;
    } catch (err) {
        console.log('Error authenticating user in database. \n', err)
    }
}

const fetchUserDetails = async (userId) => {
    try {
        const response = await pool.query(`SELECT first_name, last_name, phone, email
            FROM users WHERE id = $1 AND deleted=FALSE`, [userId]);
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

export {insertUser, fetchUserByEmail, fetchUserDetails, fetchMonthlyIncomeByYear, fetchMonthlyExpenseByYear, fetchIncomeByMonthYear, fetchExpenseByMonthYear};