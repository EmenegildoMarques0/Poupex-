<?php

namespace Modules\Courses\app\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Modules\Courses\app\Models\Course;

class CoursesController extends Controller
{
    /**
     * Display a listing of the courses.
     */
    public function index()
    {
        $courses = Course::with('lessons')->get(); // Carrega aulas relacionadas
        return response()->json($courses);
    }

    /**
     * Store a newly created course in storage.
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048', // Upload de imagem (opcional)
            'is_public' => 'boolean',
        ]);

        // Handle thumbnail upload, if provided
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        $course = Course::create(array_merge($validated, ['user_id' => Auth::id()]));

        return response()->json($course, 201);
    }

    /**
     * Display the specified course.
     */
    public function show(Course $course)
    {
        return response()->json($course->load('lessons')); // Carrega aulas relacionadas
    }

    /**
     * Update the specified course in storage.
     */
    public function update(Request $request, Course $course)
    {
        // Verifica se o usuário é o dono do curso
        if ($course->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'thumbnail' => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048',
            'is_public' => 'boolean',
        ]);

        // Handle thumbnail update, if provided
        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if ($course->thumbnail) {
                Storage::disk('public')->delete($course->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        $course->update($validated);

        return response()->json($course);
    }

    /**
     * Remove the specified course from storage.
     */
    public function destroy(Course $course)
    {
        // Verifica se o usuário é o dono do curso
        if ($course->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Delete thumbnail if exists
        if ($course->thumbnail) {
            Storage::disk('public')->delete($course->thumbnail);
        }

        $course->delete();

        return response()->json(null, 204);
    }
}