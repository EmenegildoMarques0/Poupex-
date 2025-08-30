<?php

namespace Modules\Auth\app\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Http\Controllers\Controller;
use App\Models\User;

class AuthController extends Controller
{
// LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login realizado com sucesso',
            'user' => $user,
            'token' => $token
        ]);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logout realizado com sucesso']);
    }

    // ESQUECI A SENHA (solicitar link)
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Link de reset enviado'])
            : response()->json(['message' => 'Erro ao enviar link'], 400);
    }

    // RESET DE SENHA (com token)
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Senha redefinida com sucesso'])
            : response()->json(['message' => 'Erro ao redefinir senha'], 400);
    }

    public function TokenVerify(){
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token inválido'
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'user' => $user
        ], 200);
    }
}
