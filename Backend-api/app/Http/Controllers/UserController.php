<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }
    public function register(Request $request)
    {


        $data =   $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'confirmed'],
        ]);
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        $token = $user->createToken('auth')->plainTextToken;
        return response()->json(
            [
                'ok' => true,
                'user' => $user,
                'token' => $token
            ],
            201
        );
    }


    public function login(Request $request)
    {


        $data =   $request->validate([

            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            $user = auth()->user();
            $token = $user->createToken('auth')->plainTextToken;
            return response()->json([
                'ok' => true,
                'user' => $user,
                'token' => $token
            ], 200);
        } else {
            return response()->json([
                'ok' => false,
                'message' => 'invalid credentials'
            ], 401);
        }
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'ok' => true,
            'message' => 'logout'
        ], 200);
    }


    public function updateUser(Request $request)
    {
        $user = $request->user();
        $data =   $request->validate([
            'name' => ['sometimes'],
            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('users')->ignore($request->user()->id)
            ],
            'password' => ['nullable', 'confirmed'],
        ]);


        if (isset($data['password']) && !empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $user->update($data);
        return response()->json([
            'ok' => true,
            'message' => 'update user',
            'user' => $user,
        ], 200);
    }
}
