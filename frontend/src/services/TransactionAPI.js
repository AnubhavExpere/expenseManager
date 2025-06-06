import axios, { Axios } from "axios";
import axiosInstance from "./axiosInstance";

const getTransactions = async (fromDate, toDate, category=null, paymentMethod=null) => {
    const params = {};
    if(paymentMethod) params.payment_method=paymentMethod;
    if(category) params.category=category;
    if(fromDate) params.from=fromDate;
    if(toDate) params.to=toDate;

    const response = await axiosInstance.get( `/transactions`, {params} );
    const data = await response.data;
    return data;
}
async function addTransaction(formData){
    try {
        const response = await axiosInstance.post('/transactions', formData);
        return response;
    } catch (error){
        console.log('Error: ', error);
    }
}

const editTransaction = async (transactionId, formData) => {
    try {
        const response = await axiosInstance.put(`/transactions/${transactionId}`, formData);
        return response.data;
    } catch (err) {
        console.error('Failed to edit transaction. \n', err);
    }
}

const bulkDeleteTransactions = async (transactionIds) => {
    try {
        const response = await axiosInstance.delete('/transactions/bulk-delete', {
            data : {ids: transactionIds} 
        });
        return response; 
    } catch (err) {
        console.error('Failed to delete selected transactions from API', err);
    }
}

export {getTransactions, addTransaction, editTransaction, bulkDeleteTransactions};