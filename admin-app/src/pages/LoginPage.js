// src/pages/LoginPage.js
import React from 'react';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <Login onLoginSuccess={handleLoginSuccess} />
        </div>
    );
};

export default LoginPage;
