<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware('auth:api')->get('/validate-token', function (Request $request) {
    return response()->json(['valid' => true]);
});


Route::get('/products', [ProductController::class, 'index']); // Lấy tất cả sản phẩm
Route::get('/products/{id}', [ProductController::class, 'show']); // Lấy sản phẩm theo ID
Route::post('/products', [ProductController::class, 'store']); // Tạo sản phẩm mới
Route::put('/products/{id}', [ProductController::class, 'update']); // Cập nhật sản phẩm
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Xóa sản phẩm

//category
Route::get('/categories', [CategoryController::class, 'index']); // Lấy tất cả danh mục
Route::get('/categories/{id}', [CategoryController::class, 'show']); // Lấy danh mục theo ID
Route::get('/categories/{id}/products', [CategoryController::class, 'getCategoryProducts']); // Lấy tất cả sản phẩm của một danh mục
Route::post('/categories', [CategoryController::class, 'store']); // Tạo danh mục mới
Route::put('/categories/{id}', [CategoryController::class, 'update']); // Cập nhật danh mục
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); // Xóa danh mục

//user
// Đăng ký người dùng
Route::post('/users/register', [UserController::class, 'register']);

// Đăng nhập người dùng
Route::post('/users/login', [UserController::class, 'login']);

//đổi mật khẩu
Route::middleware('auth:sanctum')->post('/users/changePassword', [UserController::class, 'changePassword']);


// Đăng xuất người dùng (cần xác thực)
Route::middleware('auth:sanctum')->post('/users/logout', [UserController::class, 'logout']);

// Các route dưới đây chỉ dành cho admin
Route::middleware('auth:sanctum')->get('/users/show', [UserController::class, 'show']);
Route::get('/users', [UserController::class, 'index']); // Lấy tất cả người dùng
// Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']); // Tạo người dùng mới
Route::put('/users/{id}', [UserController::class, 'update']); // Cập nhật thông tin người dùng
Route::delete('/users/{id}', [UserController::class, 'destroy']); // Xóa người dùng


//cart
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/cart', [CartController::class, 'addToCart']);
    Route::get('/cart', [CartController::class, 'getCartItems']);
    Route::put('/cart/{id}', [CartController::class, 'updateCartItem']);
    Route::delete('/cart/{id}', [CartController::class, 'removeCartItem']);
    Route::delete('/cart', [CartController::class, 'clearCart']);

});

//wishlist
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/wishlist', [WishlistController::class, 'addToWishlist']); // Thêm sản phẩm vào wishlist
    Route::get('/wishlist', [WishlistController::class, 'getWishlist']); // Lấy danh sách sản phẩm trong wishlist
    Route::delete('/wishlist', [WishlistController::class, 'removeFromWishlist']); // Xóa sản phẩm khỏi wishlist
});

//order vs order_item
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/order-items/{userId}', [OrderItemController::class, 'getOrderItemsByUserId']);
    Route::delete('order-items/{orderItemId}/{userId}', [OrderItemController::class, 'deleteOrderItemByIdAndUserId']);
    Route::get('/orders', [OrderController::class, 'index']); // Xem tất cả đơn hàng
    Route::get('/orders/{id}', [OrderController::class, 'getOrder']); // Xem đơn hàng cụ thể
    Route::post('/orderspay', [OrderController::class, 'store']); // Thanh toán giỏ hàng
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']); // Xóa đơn hàng
});
