// src/components/AddUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {createUser} from '../services/api';
import '../css/AddUser.css'; // Nhập file CSS

const AddUser = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRole] = useState('customer'); // Mặc định chọn 'customer'
    const [password, setPassword] = useState(''); // Thêm trạng thái cho mật khẩu
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, roles, password }; // Bao gồm mật khẩu trong dữ liệu người dùng
        try {
            await createUser(userData);
            alert("Người dùng đã được thêm thành công!");
            navigate('/users');
        } catch (error) {
            console.error("Lỗi khi thêm người dùng:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return (
        <div className="user-form-container">
            <h2>Thêm Người Dùng</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên</label>
                    <input type="text" value={username} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mật khẩu</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> {/* Thêm trường mật khẩu */}
                </div>
                <div>
                    <label>Vai trò</label>
                    <select value={roles} onChange={(e) => setRole(e.target.value)} required>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Thêm Người Dùng</button>
            </form>
        </div>
    );
};

export default AddUser;
