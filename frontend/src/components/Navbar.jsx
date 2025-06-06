import React, { useEffect, useState, useRef } from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import TopDropdown from './TopDropdown';
import { useNavigate } from 'react-router-dom';

function Navbar(){
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();

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
                <div className="navbar-logo" onClick={() => navigate('/home')}>Expnsy</div>
            {/* </Link> */}
            <div className='navigation-core-list'>
                <div className='navigation-core-list-item' onClick={() => navigate('/home')}>Home</div>
                <div className='navigation-core-list-item' onClick={() => navigate('/transactions')}>Transactions</div>
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