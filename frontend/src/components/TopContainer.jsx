import Button from "./Button";

function TopContainer(){
    const showAddExpense = () => {
        document.querySelector('.add-expense-container').classList.remove('hide-container');   
    }

    return (
        <div className='top-container'>
            <div className="welcome-text">
                <h1>Welcome Back, Anubhav!</h1>
                <p>Track your expenses and manage your budget effectively.</p>
            </div>
            <div className="action-buttons">
                <Button icon='assets/export.png' text='Import' onClick='' bgColor='white' textColor='black'/>
                <Button icon='assets/add.png' text='Add Expenses' bgColor='black' textColor='white' onClick={showAddExpense} />
            </div>
        </div>
    )
}

export default TopContainer;