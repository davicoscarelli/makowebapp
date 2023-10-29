import React, { useState } from 'react';
import axios from '../AxiosConfig.js';
import { useNavigate } from 'react-router-dom';  // <-- Import useNavigate

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // <-- Use the hook

    const handleLogin = () => {
        axios.post('/login', { username, password })
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                
                // Set Axios default header
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                onLoginSuccess();
            })
            .catch(error => {
                setErrorMessage('Invalid credentials. Please try again or sign up.');
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <button onClick={handleLogin}>Log In</button>
            <p>Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button></p>  {/* <-- Navigate to SignUp */}
        </div>
    );
}

export default Login;
