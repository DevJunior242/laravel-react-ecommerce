<?php

namespace App\Models;

use App\Models\User;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'total',
        'status',
        'payment_method',
        'delivery_method',
        'delivery_address',
        'delivery_phone',
        'delivery_email',
        'delivery_date',
        'is_delivered',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

       public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
