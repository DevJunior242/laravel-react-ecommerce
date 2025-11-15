<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all()->map(function ($product) {
            $product->path = url('storage/uploads/' . $product->file);
            return $product;
        });
        return response()->json(['products' => $products]);
    }

    public function productStore(Request $request)
    {
        $request->validate(
            [
                'name' => ['required'],
                'description' => ['required'],
                'file' => ['required', 'bail', 'file', 'mimes:jpg,png,svg,webm,mp4'],
                'price' => ['required', 'integer'],
            ]
        );
        $file = $request->file;
        if ($file) {
            $ext = $file->getClientOriginalExtension();
            $fileName = uniqid() . '.' . $ext;
            $path = $file->storeAs('uploads', $fileName, 'public');
        }
        $user = Auth::user();
        $data = [
            'user_id' => $user->id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'file' => $fileName,
            'path' => $path
        ];

        $products = Product::create($data);
        return response()->json([
            'message' => 'Product create success',
            'products' => $products
        ]);
    }
    public function productEdit(Product $product)
    {
        $user = auth()->user();
        if ($product->user_id !== $user->id) {
            abort(404);
        }
        $path = url('storage/uploads/' . $product->file);
        $product->path = $path;
        return response()->json(['product' => $product]);
    }




    public function productUpdate(Product $product, Request $request)
    {

        $request->validate(
            [
                'name' => ['required', 'string'],
                'description' => ['required', 'string'],
                'file' => ['nullable', 'bail', 'file', 'mimes:jpg,png,svg,webm,mp4'],
                'price' => ['required', 'integer', 'min:10'],
            ]
        );
        $file = $request->file;
        if ($file) {
            $ext = $file->getClientOriginalExtension();
            $fileName = uniqid() . '.' . $ext;
            $path = $file->storeAs('uploads', $fileName, 'public');
            $product->file = $fileName;
            $product->path = $path;
        }
        $user = Auth::user();
        if ($product->user_id !== $user->id) {
            abort(404);
        }
        $product->user_id = $user->id;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->save();


        return response()->json([
            'message' => 'Product update success',
            'products' => $product
        ]);
        return response()->json(['message' => 'Product update success']);
    }

    public function show(Product $product)
    {
        $path = url('storage/uploads/' . $product->file);
        $product->path = $path;
        return response()->json([
            'message' => 'Product show',
            'product' => $product
        ]);
    }

    public function productDelete(Product $product)
    {

           if ($product->user_id !== auth()->user()->id) {
            abort(404);
        }

        $path = url('storage/uploads/' . $product->file);
        $product->path = $path;

        if ($product->delete()) {
            return response()->json([
                'message' => 'Product delete success',
                'product' => $product
            ]);
        }
        return response()->json([
            'message' => 'Product delete failed',
            'product' => $product
        ]);
    }
}
