// src/components/UserManager.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, {deleteUser } from "../services/api";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer và toast
import "react-toastify/dist/ReactToastify.css";
import "../css/UserManager.css";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // State để kiểm tra vai trò admin
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data || []); // Thay đổi để lấy data nếu không phải là users
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    };

    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin'); 
    console.log("user",userRole);

    fetchUsers();
  }, []);

  const handleEditUser = (id) => {
    if (!isAdmin) {
      toast.error("Bạn không có quyền hạn để sửa người dùng!"); // Hiển thị thông báo lỗi
      return;
    }
    navigate(`/users/edit/${id}`);
  };
  const handleAddUser = () => {
    if (!isAdmin) {
      toast.error("Bạn không có quyền hạn để thêm người dùng!"); // Hiển thị thông báo lỗi
      return;
    }
    navigate("/users/add");
  };

  const handleDeleteUser = async (id) => {
    if (!isAdmin) {
      toast.error("Bạn không có quyền hạn để xóa người dùng!"); // Hiển thị thông báo lỗi
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        toast.success("Người dùng đã được xóa thành công!"); // Thông báo thành công
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại."); // Thông báo lỗi
      }
    }
  };

  return (
    <div className="user-manager-container">
      <h2>Quản lý Người dùng</h2>
      <button className="add-user-button" onClick={handleAddUser}>
        Thêm Người Dùng
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Ngày Tạo</th>
            <th>Ngày Cập Nhật</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(users) ? users : []).map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.roles}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{new Date(user.updated_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEditUser(user.id)}>Sửa</button>
                <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer /> {/* Thêm ToastContainer để hiển thị thông báo */}
    </div>
  );
};

export default UserManager;
