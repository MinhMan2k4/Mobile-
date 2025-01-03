// categoryService.js
import axiosInstance from '../api/apiService';

// Định nghĩa kiểu cho dữ liệu danh mục
interface CategoryData {
    name: string;
    description?: string;
    image_url?: string;
}


interface ProductData {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url?: string;
    // Các trường khác nếu có
}
const CATEGORY_API_URL = '/categories'; // Đường dẫn đến API danh mục

// Lấy tất cả danh mục
export const getAllCategories = async (): Promise<CategoryData[]> => {
    try {
        const response = await axiosInstance.get(CATEGORY_API_URL);
        return response.data; // Trả về dữ liệu danh mục
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// Lấy danh mục theo ID
export const getCategoryById = async (id: number | string): Promise<CategoryData> => {
    try {
        const response = await axiosInstance.get(`${CATEGORY_API_URL}/${id}`);
        return response.data; // Trả về dữ liệu danh mục
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
    }
};

// Lấy tất cả sản phẩm của một danh mục
export const getCategoryProducts = async (categoryId: number | string): Promise<{ products: ProductData[], categoryName: string }> => {
    try {
        const [productsResponse, categoryResponse] = await Promise.all([
            axiosInstance.get(`${CATEGORY_API_URL}/${categoryId}/products`),
            axiosInstance.get(`${CATEGORY_API_URL}/${categoryId}`) // Lấy thông tin danh mục
        ]);
        
        return {
            products: productsResponse.data,
            categoryName: categoryResponse.data.name, // Giả sử API trả về trường name cho danh mục
        };
    } catch (error) {
        console.error("Error fetching category products:", error);
        throw error;
    }
};