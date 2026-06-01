<?php

namespace App\Http\Controllers;

use App\Models\Subtask; 
use Illuminate\Http\Request;

class SubtaskController extends Controller
{
    public function update(Request $request, Subtask $subtask)
    {

        $status = $request->input('is_completed');
    
        $subtask->update([
            'is_completed' => (bool)$status
        ]);

        return back();
    }
}