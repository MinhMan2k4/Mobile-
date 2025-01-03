import axiosInstance from "../api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Định nghĩa kiểu cho dữ liệu đăng ký và đăng nhập
interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginData {
  login: string; // Có thể là email hoặc username
  password: string;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  created_at: string; // Nếu bạn muốn lưu thêm thông tin như ngày tạo
  updated_at: string; // Nếu bạn muốn lưu thêm thông tin như ngày cập nhật
}

interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

// Đường dẫn đến API người dùng
const USER_API_URL = "/users"; // Tùy chỉnh theo cấu trúc API của bạn

// Đăng ký người dùng mới
export const registerUser = async (
  registerData: RegisterData
): Promise<UserData> => {
  try {
    const response = await axiosInstance.post(
      `${USER_API_URL}/register`,
      registerData
    );
    return response.data; // Trả về dữ liệu người dùng mới
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Ném lại lỗi để xử lý bên ngoài
  }
};

// Đăng nhập người dùng
export const loginUser = async (
  loginData: LoginData
): Promise<{ user: UserData; token: string }> => {
  try {
    const response = await axiosInstance.post(
      `${USER_API_URL}/login`,
      loginData
    );
    const { user, token } = response.data;

    // Lưu token và dữ liệu người dùng vào AsyncStorage
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user)); // Lưu đối tượng user dưới dạng chuỗi JSON

    return { user, token }; // Trả về dữ liệu người dùng và token
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Ném lại lỗi để xử lý bên ngoài
  }
};

// Đăng xuất người dùng
export const logoutUser = async (): Promise<{ message: string }> => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem("token");

    // Nếu không có token, ném lỗi
    if (!token) {
      throw new Error("No token found");
    }

    // Cấu hình header cho yêu cầu
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Gửi yêu cầu đăng xuất với token trong header
    const response = await axiosInstance.post(`${USER_API_URL}/logout`, {}, config);

    // Xóa token khỏi AsyncStorage sau khi đăng xuất thành công
    await AsyncStorage.removeItem("token");

    return response.data; // Trả về thông báo đăng xuất thành công
  } catch (error) {
    console.error("Error logging out:", error);
    throw error; // Ném lại lỗi để xử lý bên ngoài
  }
};


// Lấy thông tin người dùng từ token
export const getUserInfo = async (): Promise<UserData> => {
    try {
      // Lấy token từ AsyncStorage
      const token = await AsyncStorage.getItem("token");
  
      // Nếu không có token, ném lỗi
      if (!token) {
        throw new Error("No token found");
      }
  
      // Cấu hình header cho yêu cầu
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Gửi yêu cầu lấy thông tin người dùng
      const response = await axiosInstance.get(`${USER_API_URL}/show`, config); // Giả sử bạn có endpoint /me để lấy thông tin người dùng
      return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  };

  // Đổi mật khẩu người dùng
export const changePassword = async (
  passwordData: ChangePasswordData
): Promise<{ message: string }> => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem("token");

    // Nếu không có token, ném lỗi
    if (!token) {
      throw new Error("No token found");
    }

    // Cấu hình header cho yêu cầu
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Gửi yêu cầu đổi mật khẩu
    const response = await axiosInstance.post(
      `/users/changePassword`,
      passwordData,
      config
    );

    return response.data; // Trả về thông báo thành công từ backend
  } catch (error) {
    console.error("Error changing password:", error);
    throw error; // Ném lại lỗi để xử lý bên ngoài
  }
};
  