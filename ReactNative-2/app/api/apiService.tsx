import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Nếu dùng AsyncStorage để lưu token

const axiosInstance = axios.create({
    baseURL: 'http://192.168.75.247:8000/api', // Thay đổi URL nếu cần
    timeout: 5000, // Thay đổi thời gian timeout nếu cần
});


// Interceptor để xử lý lỗi từ response
axiosInstance.interceptors.response.use(
    response => response, // Nếu thành công, trả về dữ liệu như bình thường
    async (error) => {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            
            if (status === 401) {
                console.error('Unauthorized: Please login again.');
                
                // Xóa token nếu lỗi 401 (Unauthorized)
                await AsyncStorage.removeItem('token');
                
                // Bạn có thể thêm logic chuyển hướng người dùng đến màn hình đăng nhập
                // Ví dụ: navigation.navigate('Login');
            } else {
                console.error('Error response:', data);
                console.error('Error status:', status);
            }
        } else if (error.request) {
            // Request đã được gửi đi nhưng không có phản hồi từ server
            console.error('Error request:', error.request);
        } else {
            // Lỗi khác liên quan đến cài đặt request
            console.error('Error message:', error.message);
        }
        return Promise.reject(error); // Đẩy lỗi lên trên để xử lý sau
    }
);


// Xuất axios instance
export default axiosInstance;
