import '../App.css';
import CashFlowBox from './CashFlowBox';
import PlotsContainer from './PlotsContainer';
import TopContainer from './TopContainer';

function MainContainer(){
    return (
        <div className="main-container">
            <TopContainer />
            <div className='analysis-container'>
                <CashFlowBox title="Total Income" amount='5,000' src='assets/uptrend.png' change='40' increased='1'/>
                <CashFlowBox title="Total Expenses" amount='2,500' src='assets/downtrend.png'change='10' increased='0' />
                <CashFlowBox title="Savings this month" amount='2,500' src='assets/uptrend.png' change='20' increased='1'/>
            </div>    
            <PlotsContainer />
        </div>
    )
} 

export default MainContainer;