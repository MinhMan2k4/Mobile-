<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    // Lấy tất cả order items theo user_id
    public function getOrderItemsByUserId($userId)
    {
        $orderItems = OrderItem::whereHas('order', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->with('product') // Gọi thông tin product liên quan
        ->get();

        return response()->json($orderItems);
    }

    // Phương thức xóa order item theo orderItemId và userId
    public function deleteOrderItemByIdAndUserId($orderItemId, $userId)
    {
        // Kiểm tra xem order item có tồn tại không
        $orderItem = OrderItem::where('id', $orderItemId)
                            ->whereHas('order', function($query) use ($userId) {
                                $query->where('user_id', $userId);
                            })
                            ->first();

        if (!$orderItem) {
            return response()->json(['message' => 'Order item not found or does not belong to this user.'], 404);
        }

        // Lấy order liên quan
        $order = $orderItem->order;

        // Xóa order item
        $orderItem->delete();

        // Kiểm tra xem còn order item nào khác không
        if ($order->orderItems()->count() === 0) {
            // Nếu không còn order item nào, xóa order
            $order->delete();
        }

        return response()->json(['message' => 'Order item deleted successfully.']);
    }
}
