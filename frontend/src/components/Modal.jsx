export default function addTransaction(){
    return (
        <div className="add-expense-container">
            <div className="add-expense-content">
                <div style={{display: 'flex'}}>
                    <h1>Add Expense</h1>
                    <button className="close-btn" id="close">x</button>
                </div>
                <form>
                    <div>
                        <label for="amount">Amount</label>
                        <input
                            id="amount"
                            type="number"
                            placeholder="Enter Amount"
                            className="form-input"
                        />
                    </div>
                    <div>
                        <label for="receiver">Amount</label>
                        <input
                            id="reciever"
                            type="text"
                            placeholder="Enter Reciever Name"
                            className="form-input"
                        />
                    </div>
                    <div>
                        <label for="payment_method">Payment Method</label>
                        <input
                            id="amount"
                            type="text"
                            placeholder="Enter Payment Method"
                            className="form-input"
                        />
                    </div>
                    <div>
                        <label for="date">Date</label>
                        <input
                            id="date"
                            type="date"
                            placeholder="Enter Date"
                            className="form-input"
                        />
                    </div>
                    <input type="submit" value="submit" className="submit-btn" />
                </form>
            </div>
        </div>
    );
}