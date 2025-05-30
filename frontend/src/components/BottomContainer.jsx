import TransactionsContainer from "./TransactionsContainer";
import Button from './Button';
import GoalProgress from "./GoalProgress";

export default function BottomContainer(){
    return (
        <div className='bottom-container'>
            <div className='transactions-view'>
                <div className='view-controls'>
                    <div className='search-transactions'>
                        <img src='assets/search.png' style={{width: '20px', height: '20px'}}/>
                        <input type='text' placeholder="Search transactions"/>
                    </div>
                    <div className="sort-filter-buttons">
                        <Button icon='assets/sort.png' text='Sort' onClick='' bgColor='white' textColor='#646464'/>
                        <Button icon='assets/filter.png' text='Filter' onClick='' bgColor='white' textColor='#646464'/>
                    </div>
                </div>
                <TransactionsContainer />
            </div>
            <div className="goal-container">
                <div className='goal-heading'>
                    <h2>Goals</h2>
                </div>
                <div className='saving-goal'>
                    <h4 style={{margin: '20px 0 5px'}}>Savings</h4>
                    <GoalProgress label='Vacation Fund' maximum='100' value='70' />
                    <GoalProgress label='Macbook' maximum='100' value='20' />
                    <GoalProgress label='Apartment' maximum='100' value='10' />
                </div>
            </div>
        </div>
    );
}

// monthly limit on each category
// saving / expenses