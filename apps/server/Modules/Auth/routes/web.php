<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\app\Http\Controllers\SocialiteController;
use Modules\Auth\app\Http\Controllers\AuthController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('auths', AuthController::class)->names('auth');
});


Route::get('auth/{provider}/callback', [SocialiteController::class, 'handleProviderCallback']);


