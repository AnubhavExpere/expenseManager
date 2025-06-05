import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'
import Button from '../components/Button';
import { registerUser } from '../services/UserAPI';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
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
        const  response = await registerUser(formData);
        if(response && response.status === 201)
            navigate('/login');
    }

    const handleSignin = (e) => {
        navigate('/login');
    }

    return (
        <div className="register-container">
            <h4>Expnsy</h4>
            <h2>Create New Account</h2>
            <p class='already-account-container'>Already have an account? <span onClick={handleSignin}>Sign in</span></p>
            <form id='registration-form' onSubmit={handleSubmit}>
                <div className='register-input-container'>
                    <label>First Name</label>
                    <input type='text' name='first_name' placeholder="" 
                        value={formData.first_name} onChange={handleChange}/>
                </div>
                <div className='register-input-container'>
                    <label>Last Name</label>
                    <input type='text' name='last_name' placeholder="" 
                        value={formData.last_name} onChange={handleChange}/>
                </div>
                <div className='register-input-container'>
                    <label>Phone</label>
                    <input type='number' name='phone' placeholder="" 
                        value={formData.phone} onChange={handleChange}/>
                </div>
                <div className='register-input-container'>
                    <label>Email</label>
                    <input type='email' name='email' placeholder="" 
                        value={formData.email} onChange={handleChange}/>
                </div>
                <div className='register-input-container'>
                    <label>Password</label>
                    <input type='password' name='password' placeholder="" 
                        value={formData.password} onChange={handleChange}/>
                </div>
                <div className='register-btn-container' >
                    <Button text="Continue" bgColor='black' textColor='white' fontSize='16px' padding='8px 10px'/>
                </div>
            </form>
        </div>
    );
}

export default Register;