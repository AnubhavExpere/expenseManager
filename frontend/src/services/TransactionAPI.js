import axiosInstance from "./axiosInstance";

const getTransactions = async () => {
    const response = await axiosInstance.get(`/transactions`);
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

export {getTransactions, addTransaction};