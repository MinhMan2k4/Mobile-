// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Thay URL bằng địa chỉ API backend
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const login = async (loginData) => {
  const response = await api.post("/users/login", loginData); // Điều chỉnh đường dẫn ở đây
  return response.data;
};

// Hàm lấy tất cả sản phẩm
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Hàm lấy sản phẩm theo ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  // Lấy token từ localStorage
  const token = localStorage.getItem('token');

  if (!token) {
      throw new Error('Bạn cần đăng nhập để thực hiện hành động này.');
  }

  const response = await api.post("/products", productData, {
      headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, // Thêm token vào header
      },
  });
  return response.data;
};

// Hàm cập nhật sản phẩm (chỉ dành cho admin)
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// Hàm xóa sản phẩm (chỉ dành cho admin)
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Hàm lấy tất cả danh mục
export const getAllCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

// Hàm lấy danh mục theo ID
export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post("/categories", categoryData, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  });
  return response.data;
};


// Hàm cập nhật danh mục (chỉ dành cho admin)
export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/categories/${id}`, categoryData);
  return response.data;
};

// Hàm xóa danh mục (chỉ dành cho admin)
export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

// Functions for User Management (Admin only)
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
export default api;
