<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('subtasks', function (Blueprint $table) {
        $table->id(); 
        $table->foreignId('task_id')->constrained('tasks')->onDelete('cascade');
        $table->string('title'); 
        $table->boolean('is_completed')->default(false);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subtasks');
    }
};
