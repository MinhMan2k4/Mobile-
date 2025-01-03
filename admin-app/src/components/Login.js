import React, { useState } from 'react';
import { login, setAuthToken } from '../services/api';
import '../css/Login.css';

const Login = ({ onLoginSuccess }) => {
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Biến trạng thái cho khung thông báo

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await login({ login: loginInput, password });
            const { token, user  } = response; // Giả sử response có trường role
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', user.roles);
            console.log("Vai trò người dùng:", user.roles);
            setAuthToken(token);
            setShowModal(true); // Hiện khung thông báo khi đăng nhập thành công
            onLoginSuccess();
        } catch (err) {
            setError('Đăng nhập thất bại, vui lòng thử lại.');
        }
    };

    // Đóng khung thông báo
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Admin Login</h2>
                <input
                    type="text"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="Email hoặc Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Đăng nhập</button>
            </form>

            {/* Khung thông báo */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Đăng nhập thành công!</h3>
                        <button onClick={closeModal}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
