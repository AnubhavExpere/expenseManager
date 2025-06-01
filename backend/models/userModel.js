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
        const response = await pool.query(`SELECT amount, month, year FROM monthly_income WHERE user_id = $1 AND year = $2`, 
            [userId, year]);
        return response.rows;
    } catch (err) {
        console.log('Error fetching income data from database. \n', err);
    }
}

export {fetchUserDetails, fetchMonthlyIncomeByYear};