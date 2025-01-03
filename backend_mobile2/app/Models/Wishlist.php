<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    // Khai báo bảng liên kết
    protected $table = 'wishlist';

    // Khai báo các thuộc tính có thể được gán
    protected $fillable = [
        'user_id',
        'product_id',
    ];

    /**
     * Thiết lập mối quan hệ với model User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Thiết lập mối quan hệ với model Product.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
