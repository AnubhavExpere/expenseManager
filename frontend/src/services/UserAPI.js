const BASE_URL = 'http://localhost:8000';

const getUser = async (userId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/user/${userId}`,{
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Failed to fetch user from API. \n', err);
    }
}

const getMonthlyIncomeByYear = async (userId, year) => {
    try {
        const response = await fetch(`${BASE_URL}/income?id=${userId}&year=${year}`,{
                method: 'GET'
            });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Failed to get income from API. \n', err );
    }
}

const getMonthlyExpenseByYear = async (userId, year) => {
    try {
        const response = await fetch(`${BASE_URL}/expense?id=${userId}&year=${year}`,{
                method: 'GET'
            });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Failed to get expense from API. \n', err );
    }
}

const getIncomeByMonthYear= async (userId, month, year) => {
    try {
        const response = await fetch(`${BASE_URL}/income/monthly?id=${userId}&month=${month}&year=${year}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Failed to fetch income from API. \n', err);
    }
}

const getExpenseByMonthYear= async (userId, month, year) => {
    try {
        const response = await fetch(`${BASE_URL}/expense/monthly?id=${userId}&month=${month}&year=${year}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Failed to fetch expense from API. \n', err);
    }
}

export {getUser, getMonthlyIncomeByYear, getMonthlyExpenseByYear, getIncomeByMonthYear, getExpenseByMonthYear};