import { logoutUser } from "../services/UserAPI";
import { useNavigate } from "react-router-dom";
import '../styles/TopDropdown.css'

const TopDropdown = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logoutUser();
            if(response && response.status === 200)
                navigate('/login');
        } catch (err) {
            console.error('Logout failed.');
        }
    }
    return (
        <div className="topdropdown-container">
            <p className="dropdown-option">Account</p>
            <p className="dropdown-option">Settings</p>
            <p className="dropdown-option" onClick={handleLogout}>Logout</p>
        </div>
    )
}

export default TopDropdown;