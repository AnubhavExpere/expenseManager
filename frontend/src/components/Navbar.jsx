import React, { useEffect, useState, useRef } from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import TopDropdown from './TopDropdown';

function Navbar(){
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();

    const handleClick = ()=> {
        setShowDropdown(prev => !prev);
    }

    const handleClickOutside = (e) => {
        if(dropdownRef && !dropdownRef.current.contains(e.target))
            setShowDropdown(false);
    }

    useEffect(()=> {
        if(showDropdown)
            window.addEventListener('click', handleClickOutside)
        else 
            window.removeEventListener('click', handleClickOutside);
        return ()=> window.removeEventListener('click', handleClickOutside);
    }, [showDropdown]);
 
    return (
        <div className="navbar-container">
            {/* <Link to="/"> */}
                <div className="title">Expnsy</div>
            {/* </Link> */}
            <div className='navigation-core-list'>
                <div className='navigation-core-list-item'>Home</div>
                <div className='navigation-core-list-item'>Transactions</div>
                <div className='navigation-core-list-item'>Contact Us</div>
                {/* <div className='navigation-core-list-item'>Settings</div> */}
            </div>
            
            <div className='navbar-icons-list'>
                {/* <div className='navigation-icons-list-item'>
                    <img src='assets/settings.png'/>
                </div> */}
                <div className='navigation-icons-list-item'>
                    <img src='assets/notification.png'/>
                </div>
                <div ref={dropdownRef}  className='navigation-icons-list-item' onClick={handleClick} style={{position: 'relative'}}>
                    <img src='assets/profile.png'/>
                    {showDropdown  && (<TopDropdown />)}
                </div>
            </div>
        </div>
    )
}

const styles={
    
}

export default Navbar;