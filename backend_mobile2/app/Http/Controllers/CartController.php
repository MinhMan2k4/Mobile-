<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Thêm sản phẩm vào giỏ hàng
    public function addToCart(Request $request)
    {
        // Kiểm tra dữ liệu đầu vào
        $request->validate([
            'product_id' => 'required|integer|exists:products,id', // Kiểm tra ID sản phẩm
            'quantity' => 'required|integer|min:1', // Kiểm tra số lượng
            'size' => 'required|string', // Kiểm tra kích thước
            'color' => 'required|string', // Kiểm tra màu sắc
        ]);

        // Lấy người dùng hiện tại từ token
        $user = $request->user();

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401); // Trả về lỗi nếu chưa đăng nhập
        }

        // Tìm sản phẩm trong giỏ hàng của người dùng
        $cartItem = Cart::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->where('size', $request->size) // Thêm điều kiện size
            ->where('color', $request->color) // Thêm điều kiện color
            ->first();

        if ($cartItem) {
            // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
            Cart::create([
                'user_id' => $user->id, // Lấy user_id của người dùng đã đăng nhập
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'size' => $request->size, // Thêm kích thước
                'color' => $request->color, // Thêm màu sắc
            ]);
        }

        return response()->json(['message' => 'Product added to cart successfully'], 200);
    }


    // Lấy danh sách sản phẩm trong giỏ hàng
    public function getCartItems(Request $request)
    {
        $user = $request->user(); // Lấy người dùng hiện tại từ token

        // Lấy tất cả sản phẩm trong giỏ hàng của người dùng
        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

        return response()->json($cartItems, 200); // Trả về danh sách sản phẩm trong giỏ hàng
    }

    // Cập nhật sản phẩm trong giỏ hàng
    public function updateCartItem(Request $request, $id)
    {
        // Kiểm tra dữ liệu đầu vào
        $request->validate([
            'quantity' => 'required|integer|min:1', // Kiểm tra số lượng
        ]);

        $cartItem = Cart::find($id);

        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404); // Nếu không tìm thấy sản phẩm trong giỏ hàng
        }

        $cartItem->quantity = $request->quantity; // Cập nhật số lượng
        $cartItem->save();

        return response()->json(['message' => 'Cart item updated successfully'], 200); // Trả về thông báo thành công
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function removeCartItem(Request $request, $id)
    {
        $cartItem = Cart::find($id);

        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404); // Nếu không tìm thấy sản phẩm trong giỏ hàng
        }

        $cartItem->delete(); // Xóa sản phẩm khỏi giỏ hàng

        return response()->json(['message' => 'Cart item removed successfully'], 200); // Trả về thông báo thành công
    }

    // Xóa toàn bộ giỏ hàng của người dùng
    public function clearCart(Request $request)
    {
        $user = $request->user(); // Lấy người dùng hiện tại từ token

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401); // Trả về lỗi nếu chưa đăng nhập
        }

        // Xóa tất cả sản phẩm trong giỏ hàng của người dùng
        Cart::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'All cart items removed successfully'], 200); // Trả về thông báo thành công
    }
}
