import { useState } from "react";
import {addTransaction} from "../services/TransactionAPI"; 

const ID=1

export default function AddTransaction(){
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        receiver: '',
        payment_method: '',
        date: '',
        description: '',
        user_id: ID
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prev => ({...prev, [name]: value}));
        // console.log(formData);
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        console.log(formData);
        await addTransaction(formData);
    }

    const hideContainer = () => {
        document.querySelector('.add-expense-container').classList.add('hide-container');   
    }

    return (
        <div className="add-expense-container">
            <div className="add-expense-content">
                <div className="add-expense-header">
                    <h1>Add Expense</h1>
                    <button className="close-btn" id="close" onClick={hideContainer}>x</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="amount">Amount</label>
                        <input
                            name="amount"
                            id="amount"
                            type="number"
                            placeholder="Enter Amount"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.amount}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="category">Category</label>
                        <input
                            name="category"
                            id="category"
                            type="text"
                            placeholder="Enter Categpry"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.category}
                        />
                    </div>
                    <div className="input-container"> 
                        <label htmlFor="receiver">Receiver</label>
                        <input
                            name="receiver"
                            id="reciever"
                            type="text"
                            placeholder="Enter Reciever Name"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.receiver}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="payment_method">Payment Method</label>
                        <input
                            name="payment_method"
                            id="payment_method"
                            type="text"
                            placeholder="Enter Payment Method"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.payment_method}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="date">Date</label>
                        <input
                            name="date"
                            id="date"
                            type="date"
                            placeholder="Enter Date"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.date}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="description">Description</label>
                        <input
                            name="description"
                            id="description"
                            type="text"
                            placeholder="Enter Description"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </div>
                    <input type="submit" value="submit" className="submit-btn" />
                </form>
            </div>
        </div>
    );
}