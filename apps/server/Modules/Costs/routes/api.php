<?php

use Illuminate\Support\Facades\Route;
use Modules\Costs\app\Http\Controllers\CostsController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('costs', CostsController::class)->names('costs');
});
