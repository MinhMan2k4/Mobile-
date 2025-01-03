// src/components/OrderManager.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../css/OrderManager.css';

const OrderManager = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await api.get('/orders');
            setOrders(response.data);
        };
        fetchOrders();
    }, []);

    return (
        <div className="order-manager-container">
            <h2>Quản lý Đơn hàng</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Người dùng</th>
                        <th>Tổng giá</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user_id}</td>
                            <td>{order.total}</td>
                            <td>{order.status}</td>
                            <td>
                                <button>Chi tiết</button>
                                <button>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManager;
