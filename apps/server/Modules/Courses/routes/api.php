<?php

use Illuminate\Support\Facades\Route;
use Modules\Courses\app\Http\Controllers\CoursesController;
use Modules\Courses\app\Http\Controllers\LessonController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('courses', CoursesController::class)->names('courses');
      Route::prefix('courses/{course}')->group(function () {
        Route::get('lessons', [LessonController::class, 'index']);
        Route::post('lessons', [LessonController::class, 'store']);
        Route::get('lessons/{lesson}', [LessonController::class, 'show']);
        Route::put('lessons/{lesson}', [LessonController::class, 'update']);
        Route::delete('lessons/{lesson}', [LessonController::class, 'destroy']);
    });
});
