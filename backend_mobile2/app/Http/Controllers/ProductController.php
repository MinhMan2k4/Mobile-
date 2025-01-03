<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Lấy tất cả sản phẩm
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // Lấy sản phẩm theo ID
    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    // Tạo sản phẩm mới
    public function store(Request $request)
    {
        // Validate các trường nhập vào
        $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Kiểm tra xem tệp tải lên có phải là hình ảnh hay không
        ]);

        // Khởi tạo mảng dữ liệu đầu vào
        $data = $request->all();

        // Kiểm tra xem có hình ảnh được tải lên không
        if ($request->hasFile('image')) {
            // Lấy tệp hình ảnh
            $image = $request->file('image');

            // Tạo tên tệp độc đáo cho hình ảnh
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            // Di chuyển hình ảnh vào thư mục public/images
            $image->move(public_path('images/products'), $imageName);

            // Lưu đường dẫn của hình ảnh vào mảng dữ liệu
            $data['image_url'] = '' . $imageName;
        }

        // Tạo sản phẩm mới với dữ liệu đã được xử lý
        $product = Product::create($data);

        // Trả về phản hồi JSON với mã 201
        return response()->json($product, 201);
    }

    // Cập nhật sản phẩm
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $request->validate([
            'name' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'quantity' => 'nullable|integer',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Thêm kiểm tra cho hình ảnh
        ]);

        // Khởi tạo mảng dữ liệu đầu vào
        $data = $request->all();

        // Kiểm tra xem có hình ảnh được tải lên không
        if ($request->hasFile('image')) {
            // Lấy tệp hình ảnh
            $image = $request->file('image');

            // Tạo tên tệp độc đáo cho hình ảnh
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            // Di chuyển hình ảnh vào thư mục public/images/products
            $image->move(public_path('images/products'), $imageName);

            // Lưu đường dẫn của hình ảnh vào mảng dữ liệu
            $data['image_url'] = '/images/products/' . $imageName;
        }

        // Cập nhật sản phẩm với dữ liệu đã được xử lý
        $product->update($data);

        return response()->json($product);
    }

    // Xóa sản phẩm
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
