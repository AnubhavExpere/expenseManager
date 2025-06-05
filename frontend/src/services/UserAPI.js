import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = 'http://localhost:8000';

const registerUser = async (user) => {
    try {
        const response = await axiosInstance.post('/register',user);
        return response;
    } catch (err) {
        console.log('Failed to register new user. \n', err);
    }       
}

const loginUser = async (user) => {
    try {
        const response = await axiosInstance.post('/login', user);
        return response;
    } catch (err) {
        console.log('Failed to login. \n', err);
    }  
}

const logoutUser = async () => {
    try {
        const response = await axiosInstance.post('/logout');
        return response;
    } catch (err) {
        console.error('Error logging out user. \n', err);
    }
}

const getUser = async () => {
    try {
        const response = await axiosInstance.get(`/user`);
        const data = await response.data;
        return data;
    } catch (err) {
        console.log('Failed to fetch user from API. \n', err);
    }
}

const getMonthlyIncomeByYear = async (year) => {
    try {
        const response = await axiosInstance.get(`/income?year=${year}`);
        const data = await response.data;
        return data;
    } catch (err) {
        console.log('Failed to get income from API. \n', err );
    }
}

const getMonthlyExpenseByYear = async (year) => {
    try {
        const response = await axiosInstance.get(`/expense?year=${year}`)
        const data = await response.data;
        return data;
    } catch (err) {
        console.log('Failed to get expense from API. \n', err );
    }
}

const getIncomeByMonthYear= async (month, year) => {
    try {
        const response = await axiosInstance.get(`/income/monthly?month=${month}&year=${year}`);
        const data = await response.data;
        return data;
    } catch (err) {
        console.log('Failed to fetch income from API. \n', err);
    }
}

const getExpenseByMonthYear= async (month, year) => {
    try {
        const response = await axiosInstance.get(`/expense/monthly?month=${month}&year=${year}`);
        const data = await response.data;
        return data;
    } catch (err) {
        console.log('Failed to fetch expense from API. \n', err);
    }
}

export {registerUser, loginUser, logoutUser, getUser, getMonthlyIncomeByYear, getMonthlyExpenseByYear, getIncomeByMonthYear, getExpenseByMonthYear};