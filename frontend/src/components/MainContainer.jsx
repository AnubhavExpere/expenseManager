import { use, useContext, useState } from 'react';
import '../App.css';
import CashFlowBox from './CashFlowBox';
import PlotsContainer from './PlotsContainer';
import TopContainer from './TopContainer';
import { getExpenseByMonthYear, getIncomeByMonthYear } from '../services/UserAPI';
import { UserContext } from '../context/User';

const date = new Date();

function MainContainer(){
    const [incomeData, setIncomeData] = useState([0,0]);
    const [expenseData,setExpenseData] = useState([0,0]);
    
    const month = date.getMonth()+1;
    const prev_month = (month-1 == 0 ) ? 12 : month-1;
    const year = date.getFullYear();

    useState(() => {
        const loadData = async () => {
            try {
                const current_income = await getIncomeByMonthYear(month, year);
                const prev_income = await getIncomeByMonthYear(prev_month, year);

                const current_expense = await getExpenseByMonthYear(month, year);
                const prev_expense = await getExpenseByMonthYear(prev_month, year);
                
                setIncomeData([current_income.income, prev_income.income]);
                setExpenseData([current_expense.expense, prev_expense.expense]);
            } catch (err) {
                console.log('Failed to load income and expense data.')
            }
        }
        loadData();
    }, []);

    const incomeChange = incomeData[1] ? Math.round(( (incomeData[0]-incomeData[1])/incomeData[1] ) * 100) : 100;   
    const expenseChange = expenseData[1] ? Math.round(( (expenseData[0]-expenseData[1])/expenseData[1] ) * 100) : 100;

    let curr_savings = incomeData[0]-expenseData[0];
    let prev_savings = incomeData[1]-expenseData[1];
    const savingsChange = prev_savings ? Math.round(( (curr_savings - prev_savings)/ prev_savings ) * 100) : 100; 

    return (
        <div className="main-container">
            <TopContainer />
            <div className='analysis-container'>
                <CashFlowBox title="Total Income" amount={incomeData[0]} change={Math.abs(incomeChange)} increased={incomeChange >= 0 ? '1' : '0'}/>
                <CashFlowBox title="Total Expenses" amount={expenseData[0]} change={Math.abs(expenseChange)} increased={expenseChange >= 0 ? '1': '0'} />
                <CashFlowBox title="Savings this month" amount={incomeData[0]-expenseData[0]} change={Math.abs(savingsChange)} increased={savingsChange >= 0 ? '1' : '0'}/>
            </div>    
            <PlotsContainer />
        </div>
    )
} 

export default MainContainer;