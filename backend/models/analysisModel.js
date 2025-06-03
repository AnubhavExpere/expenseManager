import pool from '../db/index.js';

const fetchSpendingDistribution = async (userId) => {
    try {
        const response = await pool.query('SELECT category, sum(amount) as total_amount FROM transactions WHERE user_id=$1 GROUP BY category ORDER BY total_amount DESC', 
            [userId] );
        return response.rows;
    } catch (err) {
        console.log('Failed to fetch spending distribution.  \n', err);
    }
}

export {fetchSpendingDistribution};