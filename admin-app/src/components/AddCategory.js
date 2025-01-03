// src/components/AddCategory.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../services/api';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // Lưu file ảnh vào state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            if (imageFile) {
                formData.append('image', imageFile); // Đổi tên nếu backend yêu cầu
            }

            await createCategory(formData); // Gửi formData thay vì JSON
            navigate('/categories');
        } catch (error) {
            console.error("Lỗi khi thêm danh mục:", error);
        }
    };

    return (
        <div>
            <h2>Thêm Danh Mục Mới</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Tên:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Mô tả:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div>
                    <label>Hình ảnh:</label>
                    <input type="file" onChange={handleFileChange} required />
                </div>
                <button type="submit">Thêm</button>
            </form>
        </div>
    );
};

export default AddCategory;
