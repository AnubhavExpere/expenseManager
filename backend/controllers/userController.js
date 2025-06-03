import { fetchUserDetails, fetchMonthlyIncomeByYear, fetchMonthlyExpenseByYear, fetchIncomeByMonthYear, fetchExpenseByMonthYear } from "../models/userModel.js"

const getUserDetails = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await fetchUserDetails(userId);
        res.json(result);
    } catch (err) {
        console.log('Error getting user details.');
    }
}

const getMonthlyIncomeByYear = async (req, res) => {
    const userId = req.query.id;
    const yr = req.query.year;
    
    let data = [
        { income: '', month: 1, year: yr },
        { income: '', month: 2, year: yr },
        { income: '', month: 3, year: yr },
        { income: '', month: 4, year: yr },
        { income: '', month: 5, year: yr },
        { income: '', month: 6, year: yr },
        { income: '', month: 7, year: yr },
        { income: '', month: 8, year: yr },
        { income: '', month: 9, year: yr },
        { income: '', month: 10, year: yr },
        { income: '', month: 11, year: yr },
        { income: '', month: 12, year: yr },
    ];


    try {
        const result = await fetchMonthlyIncomeByYear(userId, yr);
        
        //completing the data for all 12 months in 'data' variable
        data = data.map( obj => {
            const found = result.find(row => row.month === obj.month);
            return found ? {...found, year: yr} : obj;
        })
        res.json(data);
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
}

const getMonthlyExpenseByYear = async (req, res) => {
    const userId = req.query.id;
    const yr = req.query.year;

    let data = [
        { expense: '', month: 1, year: yr },
        { expense: '', month: 2, year: yr },
        { expense: '', month: 3, year: yr },
        { expense: '', month: 4, year: yr },
        { expense: '', month: 5, year: yr },
        { expense: '', month: 6, year: yr },
        { expense: '', month: 7, year: yr },
        { expense: '', month: 8, year: yr },
        { expense: '', month: 9, year: yr },
        { expense: '', month: 10, year: yr },
        { expense: '', month: 11, year: yr },
        { expense: '', month: 12, year: yr },
    ];

    try {
        const result = await fetchMonthlyExpenseByYear(userId, yr);

        //completing the data for all 12 months in 'data' variable
        data = data.map(obj => {
            const found = result.find( row => parseInt(row.month) === obj.month);
            return found ? {...found, year: yr} : obj;
        });
        res.json(data);
    } catch {
        console.log('Error getting monthly expenses.');
    }
}

const getIncomeByMonthYear = async (req, res) => {
    const userId = req.query.id;
    const month = req.query.month;
    const year = req.query.year;

    try {
        const result = await fetchIncomeByMonthYear(userId, month, year);
        result.length>0 ? res.json(result[0]) : res.json({income: 0, month: month, year: year});
    } catch (err) {
        res.status(500).json({message: 'Server error.'});
    }
}

const getExpenseByMonthYear = async (req, res) => {
    const userId = req.query.id;
    const month = req.query.month;
    const year = req.query.year;

    try {
        const result = await fetchExpenseByMonthYear(userId, month, year);
        result.length > 0 ? res.json(result[0]) : res.json({expense: 0, month: month, year: year});
    } catch (err) {
        res.status(500).json({message: 'Server error.'});
    }
}

export {getUserDetails, getMonthlyIncomeByYear, getMonthlyExpenseByYear, getIncomeByMonthYear, getExpenseByMonthYear};