import { formToJSON } from "axios";
import { useState } from "react";
const BASE_URL = 'http://localhost:8000'

const getTransactions = async (id) => {
    const response = await fetch(`${BASE_URL}/transactions?id=${id}`);
    const data = await response.json();
    // console.log('Data: ', data);
    return data;
}
async function addTransaction(formData){
    try {
        const response = await fetch('http://localhost:8000/transactions', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok){
            throw new Error('Failed to add expense!');
        }
    } catch (error){
        console.log('Error: ', error);
    }
}

export {getTransactions, addTransaction};