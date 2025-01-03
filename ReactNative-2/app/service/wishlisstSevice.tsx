import axiosInstance from "../api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Định nghĩa kiểu cho dữ liệu wishlist
interface WishlistItemData {
  product_id: number; // Chỉ cần ID của sản phẩm
}

interface WishlistItemResponse {
  id: number;
  product_id: number; // Chỉ cần ID của sản phẩm
}

const WISHLIST_API_URL = "/wishlist"; // Đường dẫn đến API wishlist

// Lấy tất cả sản phẩm trong wishlist
export const getWishlistItems = async (): Promise<WishlistItemResponse[]> => {
  try {
    const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
    const response = await axiosInstance.get(WISHLIST_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về danh sách sản phẩm trong wishlist
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Please login again.");
      throw new Error("Unauthorized: Please login again.");
    } else {
      console.error("Error fetching wishlist items:", error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  }
};

// Thêm sản phẩm vào wishlist
export const addToWishlist = async (
  wishlistItemData: WishlistItemData
): Promise<WishlistItemResponse> => {
  try {
    const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
    const response = await axiosInstance.post(WISHLIST_API_URL, wishlistItemData, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về thông tin sản phẩm đã thêm vào wishlist
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Please login again.");
      throw new Error("Unauthorized: Please login again.");
    } else {
      console.error("Error adding product to wishlist:", error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  }
};

// Xóa sản phẩm khỏi wishlist
export const removeFromWishlist = async (
  id: number | string
): Promise<{ message: string }> => {
  try {
    const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
    await axiosInstance.delete(`${WISHLIST_API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return { message: "Wishlist item removed successfully" }; // Trả về thông báo thành công
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Please login again.");
      throw new Error("Unauthorized: Please login again.");
    } else {
      console.error("Error removing wishlist item:", error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  }
};

// Xóa toàn bộ wishlist
export const clearWishlist = async (): Promise<{ message: string }> => {
  try {
    const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
    await axiosInstance.delete(WISHLIST_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return { message: "All wishlist items removed successfully" }; // Trả về thông báo thành công
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Please login again.");
      throw new Error("Unauthorized: Please login again.");
    } else {
      console.error("Error clearing wishlist:", error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  }
};
