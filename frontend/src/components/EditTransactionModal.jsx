import { useState, useContext } from 'react';
import { ModalContext } from '../context/Modal';
import { editTransaction } from '../services/TransactionAPI';
import '../styles/TransactionModal.css'

const EditTransactionModal = ({editingTransaction, setEditingTransaction, onSave}) => {
    const transactionId = editingTransaction.id;
    const [formData, setFormData] = useState({
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        receiver: editingTransaction.receiver,
        payment_method: editingTransaction.payment_method,
        timestamp: editingTransaction.timestamp,
        description: editingTransaction.description,
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await editTransaction(transactionId, formData);
            const updatedTransaction = result.data;
            onSave(updatedTransaction);
            console.log(result.message);
        } catch (err) {
            console.error('Transaction edit failed. \n', err);
        }
    }  

    const hideModal = (e) => {
        e.preventDefault();
        setEditingTransaction(null);
    }

    return (
        <div className={`modal-container`}>
            <div className="modal-content">
                <div className="add-expense-header">
                    <h1>Edit Transaction</h1>
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
                            name="timestamp"
                            id="date"
                            type="date"
                            placeholder="Enter Date"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.timestamp.split('T')[0]}
                        />
                    </div>
                    <div className="form-submit-buttons">
                        <button className="cancel-btn" onClick={hideModal}>Cancel</button>
                        <input form="add-expense-form" type="submit" value="Confirm" className="submit-btn" onClick={handleSubmit}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTransactionModal;