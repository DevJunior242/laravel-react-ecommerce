<?php

namespace App\Http\Controllers;

use Exception;
use Paydunya\Setup;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Paydunya\Checkout\Store;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PayDunyaController extends Controller
{
    public function __construct()
    {
        Setup::setMasterKey('8b7RbIG7-NeZH-g2T9-ioNZ-oIzDTnP4LsYA');
        Setup::setPrivateKey('test_private_4qzb9JPmNpyJA1ICIesBU4h2KDP');
        Setup::setPublicKey('test_public_a5ATTNZQMrPneEtloYcznxX0SB1');
        Setup::setToken('BU22OCqUs50YRuRnM2Wq');
        Setup::setMode('test');


        Store::setName(config('paydunya.store.name'));
        Store::setTagline(config('paydunya.store.tagline'));
        Store::setPhoneNumber(config('paydunya.store.phone'));
        Store::setPostalAddress(config('paydunya.store.address'));
        Store::setWebsiteUrl(config('paydunya.store.website'));
        Store::setLogoUrl(config('paydunya.store.logo_url'));
    }




    public function createInvoice(Order $order)
    {
        try {
            $user = auth()->user();

            Log::info('paydunya invoice create yes', [
                'user_id' => $user->id,
                'order_id' => $order->id,
                'total' => $order->total,
            ]);
            $totalItems = $order->orderItems->sum(function ($item) {
                return $item->price * $item->quantity;
            });
            if ($order->is_delivered) {
                return response()->json(['message' => 'Order already delivered']);
            }

            if ($order->total != $totalItems) {
                return response()->json(['message' => 'Total amount not match']);
            }


            $invoice = new \Paydunya\Checkout\CheckoutInvoice();


            foreach ($order->orderItems as $item) {
                $invoice->addItem(
                    $item->product?->name,
                    $item->quantity,
                    $item->price,
                    $item->price * $item->quantity,
                    $item->product?->description

                );
            }
            $invoice->setTotalAmount($order->total);
            $invoice->setCancelUrl("http://localhost:5173/payment-cancel");
            $invoice->setCallbackUrl('https://raye-unexplaining-wearifully.ngrok-free.dev/api/pay/callback');
            $invoice->setReturnUrl("http://localhost:5173/payment-success");
            $userId = Auth::id();
            $orderId = $order->id;


            $invoice->addCustomData('user_id', $userId);
            $invoice->addCustomData('order_id', $orderId);

            Log::info('paydunya invoice create', [
                'user_id' => $userId,
                'order_id' => $orderId,
                'total' => $order->total,

            ]);


            if (!$invoice->create()) {

                //log the error
                Log::error('paydunya invoice creation failed', [
                    'user_id' => $userId,
                    'order_id' => $orderId,
                    'total' => $order->total,
                    'code' => $invoice->response_code,
                    'message' => $invoice->response_text,
                ]);
                return response()->json([
                    'error' => $invoice->response_text,
                ], 400);
            }
            return response()->json([
                'message' => 'Invoice created successfully',
                'invoice_url' => $invoice->getInvoiceUrl(),
            ]);
        } catch (\Exception $e) {
            Log::error('paydunya error:' . $e->getMessage());
            return to_route('paydunya.cancel');
        }
    }

    //ipn callback
    public function handleIpn(Request $request)
    {


        try {

            Log::info('Callback PayDunya reçu', $request->all());
            $data = $request->data;
            Log::info([
                'data' => $data,
            ]);
            //verifier la signature du paiement
            if (!is_array($data)) {
                Log::error(
                    'invalid array json',
                    [
                        'raw' => $request->getContent(),
                    ]
                );
                return response()->json([
                    'error' => 'invalid json format'
                ], 400);
            }

            if (!isset($data['hash']) || !isset($data['invoice']['token'])) {
                Log::error(
                    'missing token or hash',
                    [
                        'data' => $data,
                    ]
                );
                return response()->json(['error' => 'Missing token or hash'], 400);
            }





            $myhash = hash('sha512', '8b7RbIG7-NeZH-g2T9-ioNZ-oIzDTnP4LsYA');





            if ($data['hash'] !== $myhash) {
                Log::error(
                    'paydunya callback error: invalide hash',
                    [
                        'hash' => $data['hash'],
                        'myhash' => $myhash,
                        'data' => $data,
                    ]
                );
                return response()->json(['error' => 'unauthorized'], 403);
            }

            //verifier le statut de la transaction 

            if (!isset($data['status']) || $data['status'] !== 'completed') {
                Log::error(
                    'transaction not completed',
                    [
                        'data' => $data,
                    ]
                );
                return response()->json(['error' => 'transaction not completed'], 400);
            }


            $invoice = new \Paydunya\Checkout\CheckoutInvoice();

            if ($invoice->confirm($data['invoice']['token'])) {


                $order = Order::find($data['custom_data']['status']);
                $order->update([
                    'payment_status' => 'paid',
                ]);
            }
        } catch (Exception $e) {
            Log::error('paydunya ipn erro:' . $e->getMessage());
            return response()->json(['error' => 'Internal serveur error']);
        }
    }

 
}
