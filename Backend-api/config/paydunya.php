
<?php

return [
    'store' => [
        'name' => 'Mon Site Ecommerce',
        'tagline' => 'passer vos achats en toute simplicité',
        'phone' => '0022675303579',
        'address' => 'Ouagadougou, Burkina Faso',
        'website' => 'http://127.0.0.1:8000',
        'logo_url' => 'https://i.imgur.com/TON_LOGO.png',
        
    ],

    'account' => [
        'master_key' => env('PAYDUNYA_MASTER_KEY'),
        'private_key' => env('PAYDUNYA_PRIVATE_KEY'),
        'public_key' => env('PAYDUNYA_PUBLIC_KEY'),
        'token' => env('PAYDUNYA_TOKEN'),
        'mode' => env('PAYDUNYA_MODE', 'test'),
    ],
];