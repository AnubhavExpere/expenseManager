import { act } from 'react';
import '../styles/SortOption.css'

export default function SortOption({label, active, onClick}) {
    return (
        <div onClick={onClick} className={`sort-option-container ${active ? 'active-option' : ''}`}>
            <span className="dot" style={{visibility : `${active ? '' : 'hidden'}`}}></span>
            <span>{label}</span>
        </div>
    );
}