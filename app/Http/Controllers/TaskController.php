<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Task;

class TaskController extends Controller {
    
    public function index() {
        $now = Carbon::now();
        $overdueArchiveThreshold = $now->copy()->subDays(7);
        $completedRemovalThreshold = $now->copy()->subDays(14);

        Task::where('is_archived', false)
            ->where('is_completed', false)
            ->where('is_deferred', false)
            ->where('task_date', '<', $overdueArchiveThreshold)
            ->update(['is_archived' => true]);

        Task::where('is_archived', false)
            ->where('is_completed', true)
            ->where('updated_at', '<', $completedRemovalThreshold)
            ->delete();

        Task::where('is_archived', false)
            ->where('is_planned', true)
            ->whereNotNull('upload_date')
            ->where('upload_date', '<=', $now)
            ->update(['is_planned' => false]);

        $tasks = Task::with('subtasks')
            ->where('is_archived', false)
            ->where('is_deferred', false)
            ->get();

        $currentTasks = $tasks->filter(function ($task) use ($now) {
            if (!$task->is_planned) {
                return true;
            }
            if (!$task->upload_date) {
                return true;
            }
            return Carbon::parse($task->upload_date)->lte($now);
        })->values();

        $plannedTasks = $tasks->filter(function ($task) use ($now) {
            return $task->is_planned && $task->upload_date && Carbon::parse($task->upload_date)->gt($now);
        })->values();

        return Inertia::render('TasksPage', [
            'tasks' => $tasks
        ]);
    }

    public function deferred() {
        $now = Carbon::now();

        Task::where('is_archived', false)
            ->where('is_completed', false)
            ->where('is_deferred', true)
            ->where('task_date', '<', $now)
            ->update(['is_archived' => true]);

        $deferredTasks = Task::with('subtasks')
            ->where('is_deferred', true)
            ->where('is_archived', false)
            ->get();

        return Inertia::render('DeferredTasksPage', [
            'deferredTasks' => $deferredTasks,
        ]);
    }

    public function store(Request $request) {
        $isPlanned = filter_var($request->input('is_planned'), FILTER_VALIDATE_BOOLEAN);
        $now = Carbon::now();

        $plannedLimit = 5;
        $currentLimit = 7;

        $plannedTasksCount = Task::query()
            ->where('is_archived', false)
            ->where('is_completed', false)
            ->where('is_planned', true)
            ->whereNotNull('upload_date')
            ->where('upload_date', '>', $now)
            ->count();

        $currentTasksCount = Task::query()
            ->where('is_archived', false)
            ->where('is_completed', false)
            ->where(function ($query) use ($now) {
                $query->where('is_planned', false)
                    ->orWhere(function ($plannedQuery) use ($now) {
                        $plannedQuery->where('is_planned', true)
                            ->whereNotNull('upload_date')
                            ->where('upload_date', '<=', $now);
                    });
            })
            ->count();

        if ($isPlanned && $plannedTasksCount >= $plannedLimit) {
            return redirect()->back()->withErrors(['limit' => 'Досягнуто ліміту запланованих задач (макс. 5).']);
        }

        if (!$isPlanned && $currentTasksCount >= $currentLimit) {
            return redirect()->back()->withErrors(['limit' => 'Досягнуто ліміту поточних задач (макс. 7).']);
        }

        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'task_date' => ['required', 'date'],
            'categories' => 'nullable|array',
            'upload_date' => 'nullable|date',
            'subtasks' => 'nullable|array',
            'priority' => 'required|string',
        ];

        if ($isPlanned) {
            $rules['task_date'][] = 'after:upload_date';
        }

        $validated = $request->validate($rules);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'task_date' => $validated['task_date'],
            'is_planned' => $isPlanned,
            'upload_date' => $validated['upload_date'] ?? null,
            'priority' => $validated['priority'],
            'categories' => $validated['categories'] ?? [],
            'can_edit' => $request->boolean('can_edit', true),
            'can_archive' => $request->boolean('can_archive', false),
            'has_reminder' => $request->boolean('has_reminder', true),
        ]);

        if ($request->has('subtasks')) {
            foreach ($request->subtasks as $subtask) {
                $task->subtasks()->create([
                    'title' => $subtask['title'] ?? 'Без назви',
                    'is_completed' => $subtask['is_completed'] ?? false,
                ]);
            }
        }

        return redirect()->back();
    }

    public function update(Request $request, Task $task) {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'task_date' => 'sometimes|required|date',
            'is_planned' => 'sometimes|required|boolean',
            'is_completed' => 'sometimes|boolean',
            'is_archived' => 'nullable|boolean',
            'is_deferred' => 'nullable|boolean',
            'priority' => 'sometimes|required|string',
            'can_edit' => 'nullable|boolean',
            'can_archive' => 'nullable|boolean',
            'has_reminder' => 'nullable|boolean',
            'categories' => 'nullable', 
            'subtasks' => 'nullable|array',
        ]);

        $task->update($request->except('subtasks'));

        if ($request->has('is_completed')) {
            $task->subtasks()->update([
                'is_completed' => $request->boolean('is_completed')
            ]);
        }

        if ($request->has('subtasks')) {
            $task->subtasks()->delete();
            
            foreach ($request->subtasks as $sub) {
                $task->subtasks()->create([
                    'title' => $sub['title'] ?? 'Без назви',
                    'is_completed' => $sub['is_completed'] ?? false,
                ]);
            }
        }

        return redirect()->back();
    }

    public function destroyAll()
    {
        Task::query()->update([
            'is_archived' => true,
        ]);

        return redirect()->back();
    }

    public function destroy(Task $task) {
        $task->delete();
        return redirect()->back();
    }
}