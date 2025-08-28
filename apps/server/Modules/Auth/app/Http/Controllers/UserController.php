<?php

namespace Modules\Auth\app\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    // CADASTRO
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'Usuário registrado com sucesso',
            'user' => $user
        ], 201);
    }

    // OPCIONAL: Atualização de perfil
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'password' => 'sometimes|min:6|confirmed'
        ]);

        $user = $request->user();
        if ($request->filled('name')) $user->name = $request->name;
        if ($request->filled('password')) $user->password = Hash::make($request->password);
        //$user->save();

        return response()->json([
            'message' => 'Perfil atualizado com sucesso',
            'user' => $user
        ]);
    }
}