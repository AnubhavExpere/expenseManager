import SortOption from "./SortOption";
import '../styles/SortBox.css';
import { useState, useEffect } from "react";

export default function SortBox({setShowSortBox, sortKey, setSortKey, sortOrder, setSortOrder}) {
    const handleSelectField = (field) => {
        setSortKey(field);  
        setShowSortBox(false);
    }

    const handleSelectOrder = (order) => {
        setSortOrder(order);
        setShowSortBox(false);
    }

    return (
        <div className="sort-box-container">
            <h6 className="sort-box-title">Sort By</h6>
            <div className="sort-field-container">
                <SortOption label='Amount' onClick={()=> handleSelectField('amount')} active={sortKey==='amount'}/>
                <SortOption label='Category' onClick={()=> handleSelectField('category')} active={sortKey==='category'}/>
                <SortOption label='Date' onClick={()=> handleSelectField('timestamp')} active={sortKey==='timestamp'}/>
            </div>
            <div className="divider-line"></div>
            <div className="sort-order-container">
                <SortOption label='Ascending' onClick={()=> handleSelectOrder('ascending')} active={sortOrder==='ascending'}/>
                <SortOption label='Descending' onClick={()=> handleSelectOrder('descending')} active={sortOrder==='descending'}/>
            </div>
        </div>
    )
}