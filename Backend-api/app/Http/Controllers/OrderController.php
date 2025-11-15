<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function orderStore(Request $request)
    {
        $request->validate([
            'total' => 'required|numeric',
            'status' => 'required|string',
            'payment_method' => 'required|string',
            'delivery_method' => 'required|string',
            'delivery_address' => 'nullable|string',
            'delivery_phone' => 'nullable|string',
            'delivery_email' => 'nullable|string',
            'delivery_date' => 'nullable|date',
            'is_delivered' => 'required|boolean',
        ]);
        $user = auth()->user();
        $cartItems = Cart::where('user_id', $user->id)
            ->with('product')
            ->get();
        $total = 0;
        foreach ($cartItems as $item) {
            $total += $item->product->price * $item->quantity;
        }
        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty']);
        }




        $order = new \App\Models\Order();
        $order->user_id = $user->id;
        $order->total = $total;
        $order->status = $request->status;
        $order->payment_method = $request->payment_method;
        $order->delivery_method = $request->delivery_method;
        $order->delivery_address = $request->delivery_address;
        $order->delivery_phone = $request->delivery_phone;
        $order->delivery_email = $request->delivery_email;
        $order->delivery_date = $request->delivery_date;
        $order->is_delivered = $request->is_delivered;
        $order->save();

        foreach ($cartItems as $item) {
            $orderItem = new \App\Models\OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $item->product->id;
            $orderItem->quantity = $item->quantity;
            $orderItem->price = $item->product->price;
            $orderItem->save();
        }
        Cart::where('user_id', $user->id)->delete();

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order
        ]);
    }

    public function show()
    {
        $user = auth()->user();
        $order = Order::where('user_id', $user->id)
            ->with('orderItems')
            ->latest()
            ->paginate(1);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json([
            'order' => $order,
        ]);
    }
}
