<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function contactStore(Request $request)
    {
        $request->validate(
            [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email'],
                'message' => ['required', 'string', 'max:255'],
            ]
        );
        $user = auth()->user();
        $contact = Contact::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message
        ]);
        return response()->json([
            'message' => 'Contact create success',
            'contact' => $contact
        ]);
    }
}
