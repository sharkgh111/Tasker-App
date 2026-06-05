<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'task_date',
        'is_planned',
        'upload_date',
        'priority',
        'categories',
        'can_edit',
        'can_archive',
        'is_archived',
        'is_deferred',
        'has_reminder',
        'is_completed'
    ];

    protected $casts = [
        'task_date' => 'datetime',
        'upload_date' => 'datetime',
        'categories' => 'array',
        'is_planned' => 'boolean',
        'can_edit' => 'boolean',
        'can_archive' => 'boolean',
        'is_archived' => 'boolean',
        'is_deferred' => 'boolean',
        'has_reminder' => 'boolean',
        'is_completed' => 'boolean',
    ];

    /**
     * Зв'язок «один до багатьох» з моделлю підзадач.
     */
    public function subtasks()
    {
        return $this->hasMany(Subtask::class);
    }
}