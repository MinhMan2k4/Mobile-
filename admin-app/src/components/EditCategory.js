// src/components/EditCategory.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, updateCategory } from '../services/api'; // Import đúng hàm
import '../css/EditCategory.css';

const EditCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({ name: '', description: '', image_url: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getCategoryById(id); // Gọi hàm từ categoryService
                setCategory(response);
                console.log("Category data:", response);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
            }
        };
        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCategory(id, category); // Sử dụng hàm updateCategory từ categoryService
            navigate('/categories');
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="edit-category-container">
            <h2>Sửa Danh Mục</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên:</label>
                    <input type="text" name="name" value={category.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Mô tả:</label>
                    <textarea name="description" value={category.description} onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label>Hình ảnh URL:</label>
                    <input type="text" name="image_url" value={category.image_url} onChange={handleChange} required />
                </div>
                <button type="submit">Cập nhật</button>
            </form>
        </div>
    );
};

export default EditCategory;
