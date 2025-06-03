import { useState, useEffect, useRef } from "react";
import TransactionsContainer from "./TransactionsContainer";
import Button from './Button';
import GoalProgress from "./GoalProgress";
import SortBox from "./SortBox";

export default function BottomContainer(){
    const [searchQuery, setSearchQuery] = useState('');
    const [showSortBox, setShowSortBox] = useState(false);
    const [sortKey,setSortKey] = useState('timestamp');
    const [sortOrder, setSortOrder] = useState('descending');

    const sortBtnRef = useRef();

    const handleChange = (e) => setSearchQuery(e.target.value);

    const toggleSortBox = () => {
        setShowSortBox(prev => !prev);
    }

    //if clicked outside sort button and sort box it closes the sort box
    const handleClickOutside = (e) => {
        if (sortBtnRef.current && !sortBtnRef.current.contains(e.target))
            setShowSortBox(false);
    }  

    useEffect(() => {
        if (showSortBox) {
            window.addEventListener("click", handleClickOutside);
        } else {
            window.removeEventListener("click", handleClickOutside);
        }
        return () => window.removeEventListener("click", handleClickOutside);
    }, [showSortBox]);

    return (
        <div className='bottom-container'>
            <div className='transactions-view'>
                <div className='view-controls'>
                    <div className='search-transactions'>
                        <img src='assets/search.png' style={{width: '20px', height: '20px'}}/>
                        <input type='text' placeholder="Search transactions" value={searchQuery} onChange={handleChange} />
                    </div>
                    <div className="sort-filter-buttons">
                        <div ref={sortBtnRef} style={{position: 'relative'}}>
                            <Button icon='assets/sort.png' text='Sort' onClickCallback={toggleSortBox} bgColor='white' textColor='#646464'
                            border={showSortBox ? 'solid 1px black' : ''}/>

                            {showSortBox && (
                                <div style={{position: 'absolute', top: '100%', marginTop: '5px'}}>
                                    <SortBox 
                                        setShowSortBox={setShowSortBox} 
                                        sortKey={sortKey} 
                                        setSortKey={setSortKey}
                                        sortOrder={sortOrder} 
                                        setSortOrder={setSortOrder}
                                    />
                                </div>
                            )}
                        </div>
                        
                        <Button icon='assets/filter.png' text='Filter' onClick='' bgColor='white' textColor='#646464'/>
                    </div>
                </div>
                <TransactionsContainer search={searchQuery} sortKey={sortKey} sortOrder={sortOrder} />
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
            {/* <SortBox /> */}
        </div>
    );
}

// monthly limit on each category
// saving / expenses