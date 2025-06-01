import { fetchUserDetails, fetchMonthlyIncomeByYear } from "../models/userModel.js"

const getUserDetails = async (req, res) => {
    const userId = req.query.id;
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
        { amount: '', month: '1', year: yr },
        { amount: '', month: '2', year: yr },
        { amount: '', month: '3', year: yr },
        { amount: '', month: '4', year: yr },
        { amount: '', month: '5', year: yr },
        { amount: '', month: '6', year: yr },
        { amount: '', month: '7', year: yr },
        { amount: '', month: '8', year: yr },
        { amount: '', month: '9', year: yr },
        { amount: '', month: '10', year: yr },
        { amount: '', month: '11', year: yr },
        { amount: '', month: '12', year: yr },
    ];


    try {
        const result = await fetchMonthlyIncomeByYear(userId, yr);
        
        //completing the data for all 12 months in 'data' variable
        data = data.map( obj => {
            const found = result.find(row => row.month === obj.month);
            return found ? found : obj;
        })
        res.json(data);
    } catch (err) {
        console.log('Error getting income data.');
    }
}

export {getUserDetails, getMonthlyIncomeByYear};