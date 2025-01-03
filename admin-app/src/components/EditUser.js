import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../services/api';

const EditUser = () => {
    const { id } = useParams();
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRole] = useState('customer'); // Đặt giá trị mặc định là 'customer'
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserById(id);
                setName(user.username);
                setEmail(user.email);
                setRole(user.roles); // Cập nhật vai trò từ dữ liệu người dùng
                console.log("user", user);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, roles };
        try {
            await updateUser(id, userData);
            alert("Thông tin người dùng đã được cập nhật!");
            navigate('/users');
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return (
        <div className="user-form-container">
            <h2>Chỉnh Sửa Người Dùng</h2>
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
                    <label>Vai trò</label>
                    <select value={roles} onChange={(e) => setRole(e.target.value)} required>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Cập Nhật Người Dùng</button>
            </form>
        </div>
    );
};

export default EditUser;
