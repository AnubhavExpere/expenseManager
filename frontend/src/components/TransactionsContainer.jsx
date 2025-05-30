import { useState, useEffect } from "react";
import axios from 'axios';
import { getTransactions } from "../services/TransactionAPI";


const userId = 1;

export default function TransactionsContainer(){
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const fetchedTransactions = await getTransactions(userId);
                setTransactions(fetchedTransactions);
            } catch (err) {
                console.log(err);
                setError('Failed to get transactions...');
            }
            finally {
                setLoading(false);
            }
        }
        loadTransactions();
      }, []);
      
    return (
        <div className='transactions-container'>    
            <div>
                <h2>Transactions</h2>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount($)</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((row, index) => (
                            <tr key={index}>
                                <td>{new Date(row.timestamp).toLocaleDateString()}</td>
                                <td>{row.category}</td>
                                <td>{row.description}</td>
                                <td>{row.amount}</td>
                                <td>{row.payment_method}</td>
                            </tr>
                            ))
                        }

                        {/* <tr>
                            <td>15-04-2024</td>
                            <td>Grocery</td>
                            <td>Milk</td>
                            <td>20</td>
                            <td>UPI</td>
                        </tr>
                        <tr>
                            <td>15-04-2024</td>
                            <td>Grocery</td>
                            <td>Flour</td>
                            <td>10</td>
                            <td>UPI</td>
                        </tr>
                        <tr>
                            <td>15-04-2024</td>
                            <td>Stationary</td>
                            <td>Notebooks</td>
                            <td>5</td>
                            <td>UPI</td>
                        </tr>
                        <tr>
                            <td>15-04-2024</td>
                            <td>Grocery</td>
                            <td>Snacks</td>
                            <td>15</td>
                            <td>UPI</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}