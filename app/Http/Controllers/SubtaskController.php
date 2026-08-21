<?php

namespace App\Http\Controllers;

use App\Models\Subtask; 
use Illuminate\Http\Request;

class SubtaskController extends Controller
{
    public function update(Request $request, Subtask $subtask)
    {
        $validated = $request->validate([
            'is_completed' => ['required', 'boolean'],
        ]);

        $subtask->update([
            'is_completed' => filter_var($validated['is_completed'], FILTER_VALIDATE_BOOLEAN),
        ]);

        return back();
    }
}