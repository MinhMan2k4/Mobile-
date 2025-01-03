import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api, { deleteProduct } from '../services/api';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer và toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toastify
import '../css/ProductManager.css';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await api.get('/products');
            setProducts(response.data);
        };

        const userRole = localStorage.getItem('userRole');
        setIsAdmin(userRole === 'admin'); 
        console.log("user",userRole);

        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        if (!isAdmin) {
            toast.error('Bạn không có quyền hạn để thêm sản phẩm!'); // Hiển thị thông báo lỗi
            return;
        }
        navigate('/product-form'); 
    };

    const handleEditProduct = (id) => {
        if (!isAdmin) {
            toast.error('Bạn không có quyền hạn để sửa sản phẩm!'); 
            return;
        }
        navigate(`/product-form/${id}`); 
    };

    const handleDeleteProduct = async (id) => {
        if (!isAdmin) {
            toast.error('Bạn không có quyền hạn để xóa sản phẩm!'); 
            return;
        }
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
        toast.success('Sản phẩm đã được xóa thành công!'); // Thông báo thành công
    };

    return (
        <div className="product-manager-container">
            <h2>Quản lý Sản phẩm</h2>
            <button className="add-product-button" onClick={handleAddProduct}>
                Thêm Sản Phẩm
            </button>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Hình ảnh</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleEditProduct(product.id)}>Sửa</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer /> {/* Hiển thị ToastContainer */}
        </div>
    );
};

export default ProductManager;
