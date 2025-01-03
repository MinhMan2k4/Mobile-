import axiosInstance from "../api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Định nghĩa kiểu cho dữ liệu giỏ hàng
interface CartItemData {
  product_id: number;
  quantity: number;
  size: string; // Thêm thuộc tính size
  color: string; // Thêm thuộc tính color
}

interface CartItemResponse {
  id: number;
  product_id: number;
  quantity: number;
  size: string; // Thêm thuộc tính size
  color: string; // Thêm thuộc tính color
}

const CART_API_URL = "/cart"; // Đường dẫn đến API giỏ hàng

// Lấy tất cả sản phẩm trong giỏ hàng
export const getCartItems = async (): Promise<CartItemResponse[]> => {
  try {
    const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
    const response = await axiosInstance.get(CART_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về danh sách sản phẩm trong giỏ hàng
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Please login again.");
      throw new Error("Unauthorized: Please login again.");
    } else {
      console.error("Error fetching cart items:", error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  }
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (
  cartItemData: CartItemData
): Promise<CartItemResponse> => {
  try {
    const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
    const response = await axiosInstance.post(CART_API_URL, cartItemData, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về thông tin sản phẩm đã thêm vào giỏ hàng
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Please login again.");
      throw new Error("Unauthorized: Please login again.");
    } else {
      console.error("Error adding product to cart:", error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  }
};

// Cập nhật sản phẩm trong giỏ hàng
export const updateCartItem = async (
  id: number | string,
  cartItemData: CartItemData
): Promise<CartItemResponse> => {
  try {
    const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
    const response = await axiosInstance.put(
      `${CART_API_URL}/${id}`,
      cartItemData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      }
    );
    return response.data; // Trả về thông tin sản phẩm đã cập nhật
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Please login again.");
      throw new Error("Unauthorized: Please login again.");
    } else {
      console.error("Error updating cart item:", error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = async (
  id: number | string
): Promise<{ message: string }> => {
  try {
    const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
    await axiosInstance.delete(`${CART_API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return { message: "Cart item removed successfully" }; // Trả về thông báo thành công
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Please login again.");
      throw new Error("Unauthorized: Please login again.");
    } else {
      console.error("Error removing cart item:", error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  }
};
// Xóa toàn bộ giỏ hàng
export const clearCart = async (): Promise<{ message: string }> => {
  try {
    const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
    await axiosInstance.delete(CART_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return { message: "All cart items removed successfully" }; // Trả về thông báo thành công
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Please login again.");
      throw new Error("Unauthorized: Please login again.");
    } else {
      console.error("Error clearing cart:", error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  }
};
