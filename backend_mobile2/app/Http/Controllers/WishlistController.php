<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
/**
     * Thêm sản phẩm vào wishlist.
     */
    public function addToWishlist(Request $request)
    {
        // Kiểm tra dữ liệu đầu vào
        $request->validate([
            'product_id' => 'required|exists:products,id', // Kiểm tra sản phẩm có tồn tại không
        ]);

        // Lấy người dùng hiện tại từ token
        $user = $request->user();

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401); // Trả về lỗi nếu chưa đăng nhập
        }

        // Tìm sản phẩm trong wishlist của người dùng
        $wishlist = Wishlist::firstOrCreate([
            'user_id' => $user->id, // Lấy ID người dùng đang đăng nhập
            'product_id' => $request->product_id,
        ]);

        return response()->json([
            'message' => 'Sản phẩm đã được thêm vào danh sách yêu thích.',
            'wishlist' => $wishlist,
        ], 201);
    }

    /**
     * Lấy danh sách sản phẩm trong wishlist của người dùng.
     */
    public function getWishlist(Request $request)
    {
        // Lấy người dùng hiện tại từ token
        $user = $request->user();

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401); // Trả về lỗi nếu chưa đăng nhập
        }

        // Lấy tất cả sản phẩm trong wishlist của người dùng
        $wishlistItems = Wishlist::where('user_id', $user->id)
            ->with('product') // Tải thông tin sản phẩm
            ->get();

        return response()->json($wishlistItems);
    }

    /**
     * Xóa sản phẩm khỏi wishlist.
     */
    public function removeFromWishlist(Request $request)
    {
        // Kiểm tra dữ liệu đầu vào
        $request->validate([
            'product_id' => 'required|exists:wishlist,product_id', // Kiểm tra sản phẩm có trong wishlist không
        ]);

        // Lấy người dùng hiện tại từ token
        $user = $request->user();

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401); // Trả về lỗi nếu chưa đăng nhập
        }

        // Tìm sản phẩm trong wishlist của người dùng
        $wishlistItem = Wishlist::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($wishlistItem) {
            $wishlistItem->delete(); // Xóa sản phẩm khỏi wishlist
            return response()->json(['message' => 'Sản phẩm đã được xóa khỏi danh sách yêu thích.']);
        }

        return response()->json(['message' => 'Sản phẩm không có trong danh sách yêu thích.'], 404);
    }
}
