<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::redirect('/', '/home');

Route::get('/home', function () {
    return Inertia::render('HomePage');
})->name('home');

Route::get('/tasks', function (Request $request) {
    if (!$request->header('X-Inertia')) {
        return redirect('/home');
    }
    return Inertia::render('TasksPage');
})->name('tasks');

Route::get('/archive', function (Request $request) {
    if (!$request->header('X-Inertia')) {
        return redirect('/home');
    }
    return Inertia::render('ArchivePage');
})->name('archive');