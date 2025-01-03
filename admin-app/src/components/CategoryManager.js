// src/components/CategoryManager.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, {deleteCategory} from '../services/api';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer và toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toastify
import '../css/CategoryManager.css';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
    const userRole = localStorage.getItem('userRole'); // Lấy quyền người dùng từ localStorage
    const isAdmin = userRole === 'admin'; // Kiểm tra xem người dùng có phải là admin hay không

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
                console.log("ca",response);
                console.log("man",isAdmin);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        if (!isAdmin) {
            toast.error('Bạn không có quyền hạn để xóa danh mục!'); // Thông báo nếu không phải admin
            return;
        }

        if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
            try {
                await deleteCategory(id);
                setCategories(categories.filter(category => category.id !== id)); // Cập nhật lại danh sách
                toast.success('Danh mục đã được xóa thành công!'); // Thông báo thành công
            } catch (error) {
                console.error("Lỗi khi xóa danh mục:", error);
                toast.error('Lỗi khi xóa danh mục!'); // Thông báo lỗi
            }
        }
    };

    const handleAddCategory = () => {
        if (!isAdmin) {
            toast.error('Bạn không có quyền hạn để thêm danh mục!'); // Thông báo nếu không phải admin
            return;
        }
        navigate('/categories/add');
    };

    const handleEditCategory = (id) => {
        if (!isAdmin) {
            toast.error('Bạn không có quyền hạn để sửa danh mục!'); // Thông báo nếu không phải admin
            return;
        }
        navigate(`/categories/edit/${id}`);
    };

    return (
        <div className="category-manager-container">
            <h2>Quản lý Danh mục</h2>
            <button className="add-category-button" onClick={handleAddCategory}>
                Thêm Danh Mục
            </button>
            <table className="category-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Hình ảnh</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <img 
                                    src={category.image_url} 
                                    alt={category.name} 
                                    style={{ width: '50px', height: '50px' }} 
                                />
                            </td>
                            <td>
                                <button onClick={() => handleEditCategory(category.id)}>Sửa</button>
                                <button onClick={() => handleDelete(category.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer /> {/* Hiển thị ToastContainer */}
        </div>
    );
};

export default CategoryManager;
