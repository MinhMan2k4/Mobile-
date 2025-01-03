import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import ProductManager from './components/ProductManager';
import UserManager from './components/UserManager';
import OrderManager from './components/OrderManager';
import CategoryManager from './components/CategoryManager';
import { setAuthToken } from './services/api';
import ProductForm from './components/ProductForm';
import EditCategory from './components/EditCategory';
import AddCategory from './components/AddCategory';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

function App() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<ProductManager />} />
                <Route path="/product-form/:id?" element={<ProductForm />} /> {/* Chuyển thành element */}
                <Route path="/users" element={<UserManager />} />
                <Route path="/users/add" element={<AddUser />} />
                <Route path="/users/edit/:id" element={<EditUser />} />
                <Route path="/orders" element={<OrderManager />} />
                <Route path="/categories" element={<CategoryManager />} />
                <Route path="/categories/add" element={<AddCategory />} /> {/* Chuyển thành element */}
                <Route path="/categories/edit/:id" element={<EditCategory />} /> {/* Chuyển thành element */}
            </Routes>
        </Router>
    );
}

export default App;
