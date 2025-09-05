<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title'); 
            $table->text('description'); 
            $table->string('thumbnail')->nullable(); 
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            $table->boolean('is_public')->default(true); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};