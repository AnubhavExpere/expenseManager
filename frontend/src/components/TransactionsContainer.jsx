import { useState, useEffect, useContext } from "react";
import { getTransactions } from "../services/TransactionAPI";
import { UserContext } from "../context/User";

export default function TransactionsContainer(props){
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(true);

    const userContext = useContext(UserContext);
    const userId = userContext.userId;

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

    const searchQuery = props.search;

    const filteredTransaction = searchQuery ?  transactions.filter( row => 
                            row.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            row.description.toLowerCase().includes(searchQuery.toLowerCase())
                            ) : transactions;
                                  
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
                            <th>Amount(₹)</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransaction.map((row, index) => (
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