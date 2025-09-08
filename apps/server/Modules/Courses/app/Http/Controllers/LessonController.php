<?php

namespace Modules\Courses\app\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Modules\Courses\app\Models\Course;
use Modules\Courses\app\Models\Lesson;

class LessonController extends Controller
{
    /**
     * Display a listing of the lessons for a course.
     */
    public function index(Course $course)
    {
        return response()->json($course->lessons()->orderBy('order')->get());
    }

    /**
     * Store a newly created lesson in storage.
     */
    public function store(Request $request, Course $course)
    {
        // Verifica se o usuário é o dono do curso
        if ($course->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'link' => 'required|url', // Valida YouTube URL
            'description' => 'nullable|string',
            'supporting_materials' => 'nullable|array', // Array de URLs ou arquivos
            'supporting_materials.*' => 'nullable|file|mimes:pdf|max:10240', // Máximo 10MB por arquivo
            'order' => 'integer|min:0',
        ]);

        // Handle file uploads for supporting materials
        if ($request->hasFile('supporting_materials')) {
            $materials = [];
            foreach ($request->file('supporting_materials') as $file) {
                $materials[] = $file->store('materials', 'public');
            }
            $validated['supporting_materials'] = $materials;
        }

        $lesson = $course->lessons()->create($validated);

        return response()->json($lesson, 201);
    }

    /**
     * Display the specified lesson.
     */
    public function show(Course $course, Lesson $lesson)
    {
        if ($lesson->course_id !== $course->id) {
            return response()->json(['error' => 'Lesson not found in this course'], 404);
        }

        return response()->json($lesson);
    }

    /**
     * Update the specified lesson in storage.
     */
    public function update(Request $request, Course $course, Lesson $lesson)
    {
        if ($course->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($lesson->course_id !== $course->id) {
            return response()->json(['error' => 'Lesson not found in this course'], 404);
        }

        $validated = $request->validate([
            'title' => 'string|max:255',
            'link' => 'url|regex:/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/',
            'description' => 'nullable|string',
            'supporting_materials' => 'nullable|array',
            'supporting_materials.*' => 'nullable|file|mimes:pdf|max:10240',
            'order' => 'integer|min:0',
        ]);

        // Handle file uploads for supporting materials
        if ($request->hasFile('supporting_materials')) {
            // Delete old materials if they exist
            if ($lesson->supporting_materials) {
                foreach ($lesson->supporting_materials as $material) {
                    Storage::disk('public')->delete($material);
                }
            }
            $materials = [];
            foreach ($request->file('supporting_materials') as $file) {
                $materials[] = $file->store('materials', 'public');
            }
            $validated['supporting_materials'] = $materials;
        }

        $lesson->update($validated);

        return response()->json($lesson);
    }

    /**
     * Remove the specified lesson from storage.
     */
    public function destroy(Course $course, Lesson $lesson)
    {
        if ($course->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($lesson->course_id !== $course->id) {
            return response()->json(['error' => 'Lesson not found in this course'], 404);
        }

        // Delete supporting materials if they exist
        if ($lesson->supporting_materials) {
            foreach ($lesson->supporting_materials as $material) {
                Storage::disk('public')->delete($material);
            }
        }

        $lesson->delete();

        return response()->json(null, 204);
    }
}