<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Thêm trait này

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;// Thêm HasApiTokens

    protected $fillable = [
        'username',
        'email',
        'password',
        'roles'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Liên kết với Order
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
