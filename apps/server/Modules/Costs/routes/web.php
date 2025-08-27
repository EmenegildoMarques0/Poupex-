<?php

use Illuminate\Support\Facades\Route;
use Modules\Costs\Http\Controllers\CostsController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('costs', CostsController::class)->names('costs');
});
