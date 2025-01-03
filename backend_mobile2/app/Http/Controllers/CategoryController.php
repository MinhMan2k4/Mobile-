<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    // Lấy tất cả danh mục
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    // Lấy danh mục theo ID
    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json($category);
    }

    // Tạo danh mục mới
    public function store(Request $request)
    {
        // Kiểm tra và xác thực dữ liệu đầu vào
        $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // Lấy tất cả dữ liệu đầu vào
        $data = $request->all();
    
        // Xử lý ảnh tải lên
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/category'), $imageName);
            $data['image_url'] = 'images/category/' . $imageName;
        }
    
        try {
            // Tạo danh mục với dữ liệu đã xử lý
            $category = Category::create($data);
            return response()->json($category, 201); // Trả về JSON khi tạo thành công
        } catch (\Exception $e) {
            // Trả về lỗi nếu có ngoại lệ xảy ra
            return response()->json(['message' => 'Failed to create category'], 500);
        }
    }
    

    // Cập nhật danh mục
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $request->validate([
            'name' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            // Xóa hình ảnh cũ nếu có
            if ($category->image_url && File::exists(public_path($category->image_url))) {
                File::delete(public_path($category->image_url));
            }

            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/category'), $imageName);
            $data['image_url'] = 'images/category/' . $imageName;
        }

        $category->update($data);
        return response()->json($category);
    }

    // Xóa danh mục
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Xóa hình ảnh nếu có
        if ($category->image_url && File::exists(public_path($category->image_url))) {
            File::delete(public_path($category->image_url));
        }

        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }

    public function getCategoryProducts($id)
    {
        $category = Category::with('products')->find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json($category->products);
    }
}
