<?php

use Illuminate\Support\Facades\Route;
use Modules\Stats\Http\Controllers\StatsController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('stats', StatsController::class)->names('stats');
});
