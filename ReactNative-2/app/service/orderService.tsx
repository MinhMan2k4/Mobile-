import axiosInstance from '../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OrderItemData {
    product_id: number;
    quantity: number;
    price: number;
    size?: string; // thêm kích thước
    color?: string; // thêm màu sắc
}

interface OrderData {
    total: number;
    status: string;
    order_items: OrderItemData[];
}

interface OrderResponse {
    id: number;
    // user_id: number;
    total: number;
    status: string;
    order_items: OrderItemData[];
    // created_at: string;
    // updated_at: string;
}

const ORDER_API_URL = '/orders';

// Lấy tất cả đơn hàng
export const getOrders = async (): Promise<OrderResponse[]> => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.get(ORDER_API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            console.error("Unauthorized: Please login again.");
            throw new Error("Unauthorized: Please login again.");
        } else {
            console.error("Error fetching orders:", error);
            throw error;
        }
    }
};

// Lấy chi tiết một đơn hàng
export const getOrderById = async (orderId: number): Promise<OrderResponse> => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.get(`${ORDER_API_URL}/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            console.error("Unauthorized: Please login again.");
            throw new Error("Unauthorized: Please login again.");
        } else {
            console.error("Error fetching order details:", error);
            throw error;
        }
    }
};

// Tạo đơn hàng mới (thanh toán giỏ hàng)
export const createOrder = async (orderData: OrderData): Promise<OrderResponse> => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.post(`${ORDER_API_URL}pay`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            console.error("Unauthorized: Please login again.");
            throw new Error("Unauthorized: Please login again.");
        } else {
            console.error("Error creating order:", error);
            throw error;
        }
    }
};

// Cập nhật đơn hàng (thay đổi trạng thái, số lượng, v.v...)
export const updateOrder = async (orderId: number, orderData: Partial<OrderData>): Promise<OrderResponse> => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.put(`${ORDER_API_URL}/${orderId}`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            console.error("Unauthorized: Please login again.");
            throw new Error("Unauthorized: Please login again.");
        } else {
            console.error("Error updating order:", error);
            throw error;
        }
    }
};

// Xóa đơn hàng
export const deleteOrder = async (orderId: number): Promise<{ message: string }> => {
    try {
        const token = await AsyncStorage.getItem('token');
        await axiosInstance.delete(`${ORDER_API_URL}/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { message: 'Order removed successfully' };
    } catch (error) {
        if (error.response?.status === 401) {
            console.error("Unauthorized: Please login again.");
            throw new Error("Unauthorized: Please login again.");
        } else {
            console.error("Error deleting order:", error);
            throw error;
        }
    }
};
