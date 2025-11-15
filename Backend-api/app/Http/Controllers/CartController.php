<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{


    public function cardStore(Request $request, Product $product)
    {
        $user = auth()->user();
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);
        $cart = Cart::where('user_id', $user->id)
            ->where('product_id', $product->id)
            ->first();
        if ($cart) {
            $cart->quantity = $request->quantity;
            $cart->save();
            return response()->json([
                'message' => 'Cart update success',
                'cart' => $cart
            ]);
        }
        $cart = Cart::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => $request->quantity
        ]);
        return response()->json([
            'message' => 'Cart create success',
            'cart' => $cart
        ]);
    }

    public function show(Request $request)
    {
        //attention l'erreur n+1 est pas gérée
        $user = auth()->user();
        $cart = Cart::with('product')
            ->where('user_id', $user->id)

            ->latest()
            ->paginate(2);


        if (!$cart) {
            return response()->json([
                'message' => 'Aucun article trouvé dans le panier pour ce produit.',
            ], 404);
        }
        // gerer le path de l'image
        $cart->each(function ($cart) {
            $cart->product->path = url('storage/uploads/' . $cart->product->file);
        });

        return response()->json([
            'message' => 'Cart show',
            'cart' => $cart
        ]);
    }
public function count(Request $request)
{
    $user = auth()->user();
    $cart = Cart::where('user_id', $user->id)->count();
    return response()->json([
        'message' => 'Cart count',
        'cart' => $cart
    ]);
}



    

    public function cartUpdate(Request $request, Cart $cart)
    {
        $user = auth()->user();
        if ($cart->user_id !== $user->id) {
            abort(404);
        }
        $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);
        $cart->user_id = $user->id;
        $cart->quantity = $request->quantity;
        $cart->save();
        return response()->json([
            'message' => 'Cart update success',
            'cart' => $cart
        ]);
    }



    public function cartDelete(Request $request, Cart $cart)
    {
        if ($cart->user_id !== auth()->user()->id) {
            abort(404);
        }
        $cart->delete();
        return response()->json([
            'message' => 'Cart delete success',
            'cart' => $cart
        ]);
    }
}
