import { useContext, useState } from "react";
import '../styles/TransactionModal.css';
import {addTransaction} from "../services/TransactionAPI"; 
import { ModalContext } from "../context/Modal";

export default function AddTransactionModal(){
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        receiver: '',
        payment_method: '',
        date: '',
        description: '',
    });

    const modalContext = useContext(ModalContext);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prev => ({...prev, [name]: value}));
        // console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await addTransaction(formData);
            if(result.status === 201)
                modalContext.setVisibleAddExpense(false);
        }  catch (err) {
            console.error('Error adding transaction. \n', err);
        }
    }

    const hideModal = (e) => {
        e.preventDefault();
        modalContext.setVisibleAddExpense(false);
    }

    return (
        <div className={`modal-container ${modalContext.visibleAddExpense ? '' : 'hide-container'}`}>
            <div className="modal-content">
                <div className="add-expense-header">
                    <h1>Add Expense</h1>
                    <img src='assets/close.png' className="close-btn" id="close" onClick={hideModal} />
                </div>
                <form id="add-expense-form">
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
                            placeholder="Enter Category"
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
                    <div className="form-submit-buttons">
                        <button className="cancel-btn" onClick={hideModal}>Cancel</button>
                        <input form="add-expense-form" type="submit" value="Add" className="submit-btn" onClick={handleSubmit}/>
                    </div>
                </form>
            </div>
        </div>
    );
}