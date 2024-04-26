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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('categoryId');
            $table->foreign('categoryId')->references('id')->on('categories')->onDelete('cascade');
            $table->enum('type', ['Income', 'Expense'])->nullable();
            $table->string('sourcename');
            $table->decimal('amount', 10, 2)->nullable();
            $table->enum('frequency', ['weekly', "monthly", 'yearly', 'daily'])->nullable();
            $table->string('description')->nullable();
            $table->decimal('rest', 10, 2)->nullable();
            $table->decimal('balncebefore', 10, 2)->nullable();
            $table->date('transaction_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
