<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // Đăng ký người dùng
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Mã hóa mật khẩu
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'roles' => 'customer',
        ]);

        // Tạo token cho người dùng
        // $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->only(['id', 'username', 'email', 'created_at', 'updated_at']),
            // 'token' => $token,
        ], 201);
    }


    // Đăng nhập người dùng
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Tìm người dùng theo email hoặc username
        $user = User::where('email', $request->login)
            ->orWhere('username', $request->login)
            ->first();

        if ($user && Hash::check($request->password, $user->password)) {
            // Tạo token cho người dùng sau khi đăng nhập thành công
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user->only(['id', 'username', 'email', 'created_at', 'updated_at', 'roles']),
                'token' => $token,
            ], 200);
        } else {
            return response()->json(['message' => 'Thông tin đăng nhập không chính xác.'], 401);
        }
    }

    public function changePassword(Request $request)
    {
        // Xác thực các trường mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu mới
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = $request->user();

        // Kiểm tra xem mật khẩu hiện tại có đúng không
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Mật khẩu hiện tại không chính xác.'], 401);
        }

        // Cập nhật mật khẩu mới
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Đổi mật khẩu thành công.'], 200);
    }


    public function logout(Request $request)
    {
        // Hủy bỏ token hiện tại
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Đăng xuất thành công'], 200);
    }


    //admin


    // Cập nhật thông tin người dùng
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'username' => 'nullable|string|max:100',
            'email' => 'nullable|string|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'roles' => 'required|string|in:admin,customer',
        ]);

        // Cập nhật thông tin người dùng
        $user->update($request->all());
        return response()->json($user);
    }

    // Xóa người dùng
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Xóa người dùng
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    // Lấy tất cả người dùng
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Tạo người dùng mới
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'roles' => 'required|string|in:admin,customer', // Kiểm tra roles hợp lệ
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Mã hóa mật khẩu
            'roles' => $request->roles, // Gán giá trị cho roles
        ]);

        return response()->json($user, 201);
    }
    // Lấy thông tin người dùng từ token
    public function show(Request $request)
    {
        // Lấy thông tin người dùng đã xác thực từ token
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Người dùng không tồn tại'], 404);
        }

        return response()->json($user);
    }
}
