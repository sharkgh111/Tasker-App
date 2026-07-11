<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\SubtaskController;
use App\Models\Task;

Route::redirect('/', '/home');

Route::get('/home', function () {
    return Inertia::render('HomePage');
})->name('home');

Route::get('/tasks', [TaskController::class, 'index'])->name('tasks');
Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::delete('/tasks', [TaskController::class, 'destroyAll'])->name('tasks.destroyAll');

Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
Route::patch('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');

Route::patch('/subtasks/{subtask}', [SubtaskController::class, 'update']);

Route::get('/archive', function (Request $request) {
    if (!$request->header('X-Inertia')) {
        return redirect('/home');
    }
    $archiveTasks = Task::with('subtasks')
        ->where('is_archived', true)
        ->get();

    return Inertia::render('ArchivePage', [
        'archiveTasks' => $archiveTasks,
    ]);
})->name('archive');