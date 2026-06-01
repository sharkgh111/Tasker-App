<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::create('tasks', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('description')->nullable();
        $table->dateTime('task_date');
        $table->boolean('is_urgent')->default(false);
        $table->dateTime('upload_date')->nullable();
        $table->string('priority')->default('medium');
        
        $table->json('categories')->nullable(); 

        $table->boolean('can_edit')->default(true);
        $table->boolean('can_archive')->default(true);
        $table->boolean('has_reminder')->default(true);
        $table->boolean('is_completed')->default(false);
        
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
