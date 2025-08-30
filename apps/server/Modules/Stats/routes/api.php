<?php

use Illuminate\Support\Facades\Route;
use Modules\Stats\app\Http\Controllers\StatsController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('stats', StatsController::class)->names('stats');
});

    


