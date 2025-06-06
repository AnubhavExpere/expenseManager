import { useState, useEffect, useContext } from "react";
import { bulkDeleteTransactions, getTransactions } from "../services/TransactionAPI";
import '../styles/TransactionsPage.css'
import Button from '../components/Button';
import { UserContext } from "../context/User";
import SearchTransactionBar from "../components/SearchTransactionBar";
import { ModalContext } from "../context/Modal";
import EditTransactionModal from "../components/EditTransactionModal";

const sortArray = (array, key, order) => {
    //slice() is used here to create a shallow copy of array [preserve original data]
    return array.slice().sort((a, b) => {
        let valA = a[key];
        let valB = b[key];

        // Convert strings to numbers or dates if needed
        if (key === 'amount') {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        } else if (key === 'timestamp') {
            valA = new Date(valA);
            valB = new Date(valB);
        }

        if (valA < valB) return order === 'ascending' ? -1 : 1;
        if (valA > valB) return order === 'descending' ? -1 : 1;
        return 0;
    });
}

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortKey,setSortKey] = useState('timestamp');
    const [sortOrder, setSortOrder] = useState('descending');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);

    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(true);

    const modalContext = useContext(ModalContext);
    const userContext = useContext(UserContext);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const fetchedTransactions = await getTransactions(fromDate, toDate);
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
    }, [fromDate, toDate]);

    const handleChange = (e) => setSearchQuery(e.target.value);
    const showAddExpense = () => modalContext.setVisibleAddExpense(true);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handlePaymentMethodChange = (e) => setSelectedPaymentMethod(e.target.value);
    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(prev => prev === 'ascending' ? 'descending' : 'ascending');
        } else {
            setSortKey(key);
            setSortOrder('ascending');
        }
    }; 

    const updateEditedTransaction = (updatedTransaction) => {
        setTransactions(prev => prev.map(row => 
            row.id === updatedTransaction.id ? updatedTransaction : row
        ));
        setEditingTransaction(null);
    }

    const handleDeleteSelected = async () => {
        try {
            const result = await bulkDeleteTransactions(selectedIds);
            if(result.status === 200) {
                setTransactions(prev => prev.filter(tx => !selectedIds.includes(tx.id)));
                setSelectedIds([]);
            }
        } catch (err) {
            console.error('Failed to delete selected transactions.')
        }
    }

    let filteredTransaction = transactions.filter( row => { 
        const matchesSearch = row.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                row.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory ? row.category === selectedCategory : true;
        const matchesPaymentMethod = selectedPaymentMethod ? row.payment_method === selectedPaymentMethod : true;
        return matchesSearch && matchesCategory && matchesPaymentMethod;
    })

    filteredTransaction = sortArray(filteredTransaction,sortKey,sortOrder);
    
    return (
        <div className="transactions-page-container">  
            <div className="transactions-page-content">
                <div className='transactions-header'>
                    <h2>Transactions</h2>
                    <div className="add-transaction-button-box">
                        <SearchTransactionBar value={searchQuery} onChangeCallback={handleChange}/>
                        {/* <Button text='Add Income' bgColor='none' textColor='black' fontSize='13px' padding='8px 10px' 
                                buttonBorder="2px solid black" /> */}
                        <Button text='Add Expense' bgColor='black' textColor='white' fontSize='13px' padding='8px 10px'
                            onClickCallback={showAddExpense} />
                    </div>
                </div>
                <div className='transactions-filter-option-list'>
                    <div className="filter-date-box">
                        <p>Category: </p>
                        <select value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">All</option>
                            {[...new Set(transactions.map(t => t.category))].map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>   
                    </div>
                    <div className="filter-date-box">
                        <p>Payment Method: </p>
                        <select value={selectedPaymentMethod} onChange={handlePaymentMethodChange}>
                            <option value="">All</option>
                            {[...new Set(transactions.map(t => t.payment_method))].map((payment_method, index) => (
                                <option key={index} value={payment_method}>{payment_method}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-date-box">
                        <p>From: </p>
                        <input value={fromDate} type='date' onChange={(e)=>setFromDate(e.target.value)} />
                    </div>
                    <div className="filter-date-box">
                        <p>To: </p>
                        <input value={toDate} type='date' onChange={(e)=>setToDate(e.target.value)} />
                    </div>
                    <Button
                        text="Delete Selected"
                        bgColor={selectedIds.length>0 ? 'red' : '#4f4f4f'}
                        textColor="white"
                        fontSize="13px"
                        padding="8px 10px"
                        onClickCallback={handleDeleteSelected}
                    />
                </div>
                <div className="transactions-box">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    Date
                                    <img src="assets/sort arrows.png" onClick={() => handleSort('timestamp')}
                                        className={`arrow ${sortKey === 'timestamp' && sortOrder === 'ascending' ? 'up' : ''}`} />
                                </th>
                                <th>
                                    Category
                                    <img src="assets/sort arrows.png" onClick={() => handleSort('category')}
                                        className={`arrow ${sortKey === 'category' && sortOrder === 'ascending' ? 'up' : ''}`} />    
                                </th>
                                <th>
                                    Description
                                    <img src="assets/sort arrows.png" onClick={() => handleSort('description')} 
                                        className={`arrow ${sortKey === 'description' && sortOrder === 'ascending' ? 'up' : ''}`} />
                                </th>
                                <th>
                                    Amount (₹)
                                    <img src="assets/sort arrows.png" onClick={() => handleSort('amount')}
                                        className={`arrow ${sortKey === 'amount' && sortOrder === 'ascending' ? 'up' : ''}`} />
                                </th>
                                <th>
                                    Receiver
                                    <img src="assets/sort arrows.png" onClick={() => handleSort('receiver')}
                                        className={`arrow ${sortKey === 'receiver' && sortOrder === 'ascending' ? 'up' : ''}`} />
                                </th>
                                <th>
                                    Payment Method
                                    <img src="assets/sort arrows.png" onClick={() => handleSort('payment_method')}
                                        className={`arrow ${sortKey === 'payment_method' && sortOrder === 'ascending' ? 'up' : ''}`} />
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransaction.map((row, index) => (
                                <tr key={index} id={row.id}>
                                    <td>
                                        <input type="checkbox" 
                                            checked={selectedIds.includes(row.id)}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setSelectedIds(prev => 
                                                    isChecked ? [...prev,row.id] : prev.filter(id => id !==row.id)
                                                )
                                            }}
                                        />
                                    </td>
                                    <td>{new Date(row.timestamp).toLocaleDateString()}</td>
                                    <td>{row.category}</td>
                                    <td>{row.description}</td>
                                    <td>₹{row.amount}</td>
                                    <td>{row.receiver}</td>
                                    <td>{row.payment_method}</td>
                                    <td><img src="assets/edit (1).png" className="edit-transaction-icon" onClick={()=>setEditingTransaction(row)}/></td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {editingTransaction && 
                        (< EditTransactionModal 
                            setEditingTransaction={setEditingTransaction} 
                            editingTransaction={editingTransaction}
                            onSave={updateEditedTransaction}
                        />)
                    }
                </div>
            </div>
        </div>
    );
}

export default TransactionsPage;