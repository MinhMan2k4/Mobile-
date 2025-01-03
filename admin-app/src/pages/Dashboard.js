// src/pages/Dashboard.js
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProductManagement from '../components/ProductManager';
import UserManagement from '../components/UserManager';
import OrderManagement from '../components/OrderManager';
import CategoryManagement from '../components/CategoryManager';
import '../css/Dashboard.css';

const Dashboard = () => {
    const [activeLink, setActiveLink] = useState('');

    return (
        <div className="dashboard">
            {/* Sidebar để điều hướng */}
            <aside className="sidebar">
                <h3>Admin Dashboard</h3>
                <nav>
                    <ul>
                        <li>
                            <Link to="/products" onClick={() => setActiveLink('products')}
                                  className={activeLink === 'products' ? 'active' : ''}>
                                Quản lý Sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link to="/users" onClick={() => setActiveLink('users')}
                                  className={activeLink === 'users' ? 'active' : ''}>
                                Quản lý Người dùng
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders" onClick={() => setActiveLink('orders')}
                                  className={activeLink === 'orders' ? 'active' : ''}>
                                Quản lý Đơn hàng
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories" onClick={() => setActiveLink('categories')}
                                  className={activeLink === 'categories' ? 'active' : ''}>
                                Quản lý Danh mục
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Content area để hiển thị nội dung */}
            <section className="content-area">
                <Routes>
                    <Route path="/products" element={<ProductManagement />} />
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/orders" element={<OrderManagement />} />
                    <Route path="/categories" element={<CategoryManagement />} />
                </Routes>
            </section>
        </div>
    );
};

export default Dashboard;
