<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
        'category_id',
        'image_url',
        'size',
        'color',
    ];
     // Liên kết với Category
     public function category()
     {
         return $this->belongsTo(Category::class);
     }
 
     // Liên kết với OrderItem
     public function orderItems()
     {
         return $this->hasMany(OrderItem::class);
     }
}
