<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PayDunyaController;


Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'index']);
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [UserController::class, 'logout']);
Route::middleware('auth:sanctum')->put('update-user', [UserController::class, 'updateUser']);

Route::middleware('auth:sanctum')->get('/check-user', function () {
    return response()->json(['valid' => true]);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/index', [ProductController::class, 'index']);
    Route::post('product', [ProductController::class, 'productStore']);
    Route::get('product/show/{product}', [ProductController::class, 'show']);
    Route::get('product/edit/{product}', [ProductController::class, 'productEdit']);
    Route::post('product/{product}/update', [ProductController::class, 'productUpdate']);
    Route::delete('product/{product}/delete', [ProductController::class, 'productDelete']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/index', [ProductController::class, 'index']);
    Route::post('cart/{product}', [CartController::class, 'cardStore']);

    Route::get('cart/show', [CartController::class, 'show']);
    Route::get('cart/count', [CartController::class, 'count']);

    Route::post('cart/{cart}/update', [CartController::class, 'cartUpdate']);
    Route::delete('cart/{cart}/delete', [CartController::class, 'cartDelete']);
});

//order
Route::middleware('auth:sanctum')->group(function () {
    Route::post('order', [OrderController::class, 'orderStore']);
    Route::get('order/show', [OrderController::class, 'show']);
    Route::post('order/{order}/update', [OrderController::class, 'orderUpdate']);
    Route::delete('order/{order}/delete', [OrderController::class, 'orderDelete']);
    
});
Route::middleware('auth:sanctum')->post('/contact', [ContactController::class, 'contactStore']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/pay/{order}', [PayDunyaController::class, 'createInvoice'])->name('paydunya.pay');

    Route::get('/pay/success', [PayDunyaController::class, 'paymentSuccess'])->name('paydunya.success');
    Route::get('/pay/cancel', [PayDunyaController::class, 'paymentCancel'])->name('paydunya.cancel');
});

Route::post('/pay/callback', [PayDunyaController::class, 'handleIpn'])->name('paydunya.callback')
    ->withoutMiddleware([\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class]);
