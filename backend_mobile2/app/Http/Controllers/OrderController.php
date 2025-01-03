<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    // Lấy tất cả đơn hàng của người dùng hiện tại
    public function index(Request $request)
    {
        $user = $request->user();

        // Lấy tất cả đơn hàng của người dùng hiện tại
        $orders = Order::where('user_id', $user->id)->with('orderItems')->get();

        return response()->json($orders);
    }
    public function show(Request $request, $id)
    {
        $user = $request->user();

        $order = Order::where('user_id', $user->id)->with('orderItems')->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    // Tạo đơn hàng mới từ giỏ hàng
    public function store(Request $request)
    {
        $user = $request->user();

        Log::info($request->all());

        $request->validate([
            'total' => 'required|numeric',
            'status' => 'required|string',
            'order_items' => 'required|array',
            'order_items.*.product_id' => 'required|exists:products,id',
            'order_items.*.quantity' => 'required|integer|min:1',
            'order_items.*.price' => 'required|numeric',
            'order_items.*.size' => 'nullable|string',
            'order_items.*.color' => 'nullable|string',
        ]);

        // Tạo đơn hàng
        $order = Order::create([
            'user_id' => $user->id,
            'total' => $request->total,
            'status' => $request->status,
        ]);

        // Lưu các mục chi tiết của đơn hàng
        foreach ($request->order_items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'size' => $item['size'] ?? null,
                'color' => $item['color'] ?? null,
            ]);
        }

        return response()->json($order->load('orderItems'), 201);
    }

    // Xóa đơn hàng và các mục chi tiết liên quan
    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        $order = Order::where('user_id', $user->id)->find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Xóa các mục chi tiết của đơn hàng
        $order->orderItems()->delete();
        // Xóa đơn hàng
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
}
