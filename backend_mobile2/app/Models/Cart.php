<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = 'cart'; 

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'size', // Thêm kích thước vào đây
        'color', // Thêm màu sắc vào đây
    ];

    // Thiết lập quan hệ với model User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Thiết lập quan hệ với model Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
