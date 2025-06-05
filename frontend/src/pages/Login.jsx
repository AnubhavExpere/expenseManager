import { useState } from "react";
import Button from "../components/Button";
import { loginUser } from "../services/UserAPI";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(formData);
        if( response && response.status === 200)
            navigate('/home');
    }

    const handleCreateAccount = (e) => {
        navigate('/register');
    }

    return (
        <div className="login-container">
            <h4>Expnsy</h4>
            <h2>Sign in</h2>
            <p class='new-user-container'>New user? <span onClick={handleCreateAccount}>Create an account</span></p>
            <form id='login-form' onSubmit={handleSubmit}>
                <div className='login-input-container'>
                    <label>Email</label>
                    <input type='email' name='email' placeholder="Enter you email" 
                        value={formData.email} onChange={handleChange}/>
                </div>
                <div className='login-input-container'>
                    <label>Password</label>
                    <input type='password' name='password' placeholder="Enter you password" 
                        value={formData.password} onChange={handleChange}/>
                </div>
                <div className='login-btn-container' >
                    <Button text="Sign in" bgColor='black' textColor='white' fontSize='16px' padding='8px 10px'/>
                </div>
            </form>
        </div>
    );
}

export default Login;