import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct, getAllCategories } from '../services/api';
import '../css/ProductForm.css';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category_id: '',
    });
    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null); // Thêm state cho file ảnh
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCategories = async () => {
            const categoryData = await getAllCategories();
            setCategories(categoryData);
        };
        fetchCategories();

        if (id) {
            const fetchProduct = async () => {
                const productData = await getProductById(id);
                setProduct(productData);
            };
            fetchProduct();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // Cập nhật state cho file ảnh
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('quantity', product.quantity);
        formData.append('category_id', product.category_id);
        if (imageFile) {
            formData.append('image', imageFile); // Thêm file ảnh vào FormData
        }
        try {
            if (id) {
                await updateProduct(id, formData); // Cập nhật sản phẩm với FormData
            } else {
                await createProduct(formData); // Tạo sản phẩm mới với FormData
            }
            navigate('/products'); // Điều hướng về danh sách sản phẩm sau khi thêm hoặc cập nhật thành công
        } catch (error) {
            console.error("Error saving product:", error);
            // Bạn có thể hiển thị thông báo lỗi cho người dùng ở đây
        }
    };
    

    return (
        <div className="product-form-container">
            <h2>{id ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm'}</h2>
            <form className="product-form" onSubmit={handleSubmit}>
                <label>Tên:</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} required />
                
                <label>Mô tả:</label>
                <textarea name="description" value={product.description} onChange={handleChange} required />
                
                <label>Giá:</label>
                <input type="number" name="price" value={product.price} onChange={handleChange} required />
                
                <label>Số lượng:</label>
                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
                
                <label>Danh mục:</label>
                <select name="category_id" value={product.category_id} onChange={handleChange} required>
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                
                <label>Hình ảnh:</label>
                <input type="file" name="image" onChange={handleFileChange} /> {/* Thêm input cho file */}
                
                <button type="submit">{id ? 'Cập nhật' : 'Thêm'}</button>
            </form>
        </div>
    );
};

export default ProductForm;
