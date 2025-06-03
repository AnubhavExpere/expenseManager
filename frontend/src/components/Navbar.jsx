import React from 'react';
import '../App.css';
import { Line } from 'recharts';
import { Link } from 'react-router-dom';
function Navbar(){
    return (
        <div className="navbar-container">
            {/* <Link to="/"> */}
                <div className="title">ExpMang.</div>
            {/* </Link> */}
            <div className='navbar-list'>
                <div>Home</div>
                <div>Transactions</div>
                <div>Contact Us</div>
                <div>Settings</div>
            </div>
            
            <div className='navbar-icons'>
                <div>
                    <img src='assets/settings.png'/>
                </div>
                <div>
                    <img src='assets/notification.png'/>
                </div>
                <div>
                    <img src='assets/profile.png'/>
                </div>
            </div>
        </div>
    )
}

const styles={
    
}

export default Navbar;