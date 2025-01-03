<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use App\Models\Cart;
use App\Models\Order;

class AdminController extends Controller
{
    // Quản lý sản phẩm
    public function products()
    {
        $products = Product::all(); // Lấy tất cả sản phẩm từ bảng products
        return view('admin.products', compact('products')); // Trả về view admin.products cùng với dữ liệu sản phẩm
    }

    // Quản lý danh mục
    public function categories()
    {
        $categories = Category::all(); // Lấy tất cả danh mục từ bảng categories
        return view('admin.categories', compact('categories')); // Trả về view admin.categories cùng với dữ liệu danh mục
    }

    // Quản lý người dùng
    public function users()
    {
        $users = User::all(); // Lấy tất cả người dùng từ bảng users
        return view('admin.users', compact('users')); // Trả về view admin.users cùng với dữ liệu người dùng
    }

    // Quản lý giỏ hàng
    public function carts()
    {
        $carts = Cart::all(); // Lấy tất cả giỏ hàng từ bảng carts
        return view('admin.carts', compact('carts')); // Trả về view admin.carts cùng với dữ liệu giỏ hàng
    }

    // Quản lý đơn hàng
    public function orders()
    {
        $orders = Order::all(); // Lấy tất cả đơn hàng từ bảng orders
        return view('admin.orders', compact('orders')); // Trả về view admin.orders cùng với dữ liệu đơn hàng
    }
}
