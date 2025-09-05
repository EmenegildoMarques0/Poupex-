<?php

use Illuminate\Support\Facades\Route;
use Modules\Courses\Http\Controllers\CoursesController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('courses', CoursesController::class)->names('courses');
});
