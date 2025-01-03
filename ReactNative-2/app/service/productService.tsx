// productService.js
import axiosInstance from '../api/apiService';



// Định nghĩa kiểu cho dữ liệu sản phẩm
interface ProductData {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    category_id: number;
    image?: string;
    size: string;
}

const PRODUCT_API_URL = '/products'; // Đường dẫn đến API sản phẩm

// Lấy tất cả sản phẩm
export const getAllProducts = async (): Promise<any[]> => {
    try {
        const response = await axiosInstance.get(PRODUCT_API_URL);
        return response.data; // Trả về dữ liệu sản phẩm
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// Lấy sản phẩm theo ID
export const getProductById = async (id: number | string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`${PRODUCT_API_URL}/${id}`);
        return response.data; // Trả về dữ liệu sản phẩm
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

// Tạo sản phẩm mới
export const createProduct = async (productData: ProductData): Promise<any> => {
    try {
        const response = await axiosInstance.post(PRODUCT_API_URL, productData);
        return response.data; // Trả về dữ liệu sản phẩm mới
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// Cập nhật sản phẩm
export const updateProduct = async (id: number | string, productData: ProductData): Promise<any> => {
    try {
        const response = await axiosInstance.put(`${PRODUCT_API_URL}/${id}`, productData);
        return response.data; // Trả về dữ liệu sản phẩm đã cập nhật
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// Xóa sản phẩm
export const deleteProduct = async (id: number | string): Promise<{ message: string }> => {
    try {
        await axiosInstance.delete(`${PRODUCT_API_URL}/${id}`);
        return { message: 'Product deleted successfully' }; // Trả về thông báo thành công
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};
