<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\app\Http\Controllers\AuthController;
use Modules\Auth\app\Http\Controllers\SocialiteController;
use Modules\Auth\app\Http\Controllers\UserController;

Route::get('auth/{provider}/callback', [SocialiteController::class, 'handleProviderCallback']);
Route::prefix('v1')->group(function () {
    // ROTAS PÚBLICAS
    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
    Route::get('auth/{provider}', [SocialiteController::class, 'redirectToProvider']);
    // ROTAS PROTEGIDAS
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::put('user', [UserController::class, 'update']);
        Route::get('user', function (Request $request) {
            return $request->user();
        });
    });
});