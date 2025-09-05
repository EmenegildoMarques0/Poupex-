<?php

namespace Modules\Courses\app\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lesson extends Model
{
    use HasFactory;

    protected $table = 'lessons';

    protected $fillable = [
        'course_id',
        'title',
        'link',
        'description',
        'supporting_materials',
        'order',
    ];

    protected $casts = [
        'supporting_materials' => 'array', 
    ];

    // Relacionamento: Uma aula pertence a um curso
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}