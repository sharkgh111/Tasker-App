<?php

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('expired tasks older than 7 days are removed from the task list', function () {
    $user = User::factory()->create();

    $expiredTask = Task::create([
        'title' => 'Просрочена задача',
        'description' => 'Тест',
        'task_date' => now()->subDays(8),
        'is_planned' => false,
        'upload_date' => null,
        'priority' => 'medium',
        'categories' => [],
        'can_edit' => true,
        'can_archive' => true,
        'is_archived' => false,
        'is_deferred' => false,
        'has_reminder' => true,
        'is_completed' => false,
    ]);

    $activeTask = Task::create([
        'title' => 'Актуальна задача',
        'description' => 'Тест',
        'task_date' => now()->addDay(),
        'is_planned' => false,
        'upload_date' => null,
        'priority' => 'medium',
        'categories' => [],
        'can_edit' => true,
        'can_archive' => true,
        'is_archived' => false,
        'is_deferred' => false,
        'has_reminder' => true,
        'is_completed' => false,
    ]);

    $response = $this->actingAs($user)->get('/tasks');

    $response->assertOk();
    $this->assertDatabaseMissing('tasks', ['id' => $expiredTask->id]);
    $this->assertDatabaseHas('tasks', ['id' => $activeTask->id]);
});

test('completed tasks older than 14 days are removed from the task list', function () {
    $user = User::factory()->create();

    $completedTask = Task::create([
        'title' => 'Виконана задача',
        'description' => 'Тест',
        'task_date' => now()->subDays(20),
        'is_planned' => false,
        'upload_date' => null,
        'priority' => 'medium',
        'categories' => [],
        'can_edit' => true,
        'can_archive' => true,
        'is_archived' => false,
        'is_deferred' => false,
        'has_reminder' => true,
        'is_completed' => true,
    ]);

    Task::query()->where('id', $completedTask->id)->update(['updated_at' => now()->subDays(15)]);

    $activeTask = Task::create([
        'title' => 'Не виконана задача',
        'description' => 'Тест',
        'task_date' => now()->addDay(),
        'is_planned' => false,
        'upload_date' => null,
        'priority' => 'medium',
        'categories' => [],
        'can_edit' => true,
        'can_archive' => true,
        'is_archived' => false,
        'is_deferred' => false,
        'has_reminder' => true,
        'is_completed' => false,
    ]);

    $response = $this->actingAs($user)->get('/tasks');

    $response->assertOk();
    $this->assertDatabaseMissing('tasks', ['id' => $completedTask->id]);
    $this->assertDatabaseHas('tasks', ['id' => $activeTask->id]);
});

test('it prevents creating more than 5 planned tasks', function () {
    $user = User::factory()->create();

    foreach (range(1, 5) as $index) {
        Task::create([
            'title' => "Запланована задача {$index}",
            'description' => 'Тест',
            'task_date' => now()->addDays($index + 1),
            'is_planned' => true,
            'upload_date' => now()->addDays($index),
            'priority' => 'medium',
            'categories' => [],
            'can_edit' => true,
            'can_archive' => true,
            'is_archived' => false,
            'is_deferred' => false,
            'has_reminder' => true,
            'is_completed' => false,
        ]);
    }

    $response = $this->actingAs($user)->post('/tasks', [
        'title' => 'Нова запланована задача',
        'description' => 'Тест',
        'task_date' => now()->addDays(10)->format('Y-m-d H:i:s'),
        'is_planned' => true,
        'upload_date' => now()->addDays(2)->format('Y-m-d H:i:s'),
        'priority' => 'high',
        'categories' => [],
        'subtasks' => [],
        'can_edit' => true,
        'can_archive' => true,
        'has_reminder' => true,
    ]);

    $response->assertSessionHasErrors('limit');
    $response->assertSessionHasErrors(['limit' => 'Досягнуто ліміту запланованих задач (макс. 5).']);
});

test('it prevents creating more than 7 current tasks while ignoring planned future tasks', function () {
    $user = User::factory()->create();

    foreach (range(1, 7) as $index) {
        Task::create([
            'title' => "Поточна задача {$index}",
            'description' => 'Тест',
            'task_date' => now()->addDays($index),
            'is_planned' => false,
            'upload_date' => null,
            'priority' => 'medium',
            'categories' => [],
            'can_edit' => true,
            'can_archive' => true,
            'is_archived' => false,
            'is_deferred' => false,
            'has_reminder' => true,
            'is_completed' => false,
        ]);
    }

    Task::create([
        'title' => 'Майбутня запланована задача',
        'description' => 'Тест',
        'task_date' => now()->addDays(20),
        'is_planned' => true,
        'upload_date' => now()->addDays(10),
        'priority' => 'medium',
        'categories' => [],
        'can_edit' => true,
        'can_archive' => true,
        'is_archived' => false,
        'is_deferred' => false,
        'has_reminder' => true,
        'is_completed' => false,
    ]);

    $response = $this->actingAs($user)->post('/tasks', [
        'title' => 'Ще одна поточна задача',
        'description' => 'Тест',
        'task_date' => now()->addDays(3)->format('Y-m-d H:i:s'),
        'is_planned' => false,
        'upload_date' => null,
        'priority' => 'low',
        'categories' => [],
        'subtasks' => [],
        'can_edit' => true,
        'can_archive' => true,
        'has_reminder' => true,
    ]);

    $response->assertSessionHasErrors('limit');
    $response->assertSessionHasErrors(['limit' => 'Досягнуто ліміту поточних задач (макс. 7).']);
});
