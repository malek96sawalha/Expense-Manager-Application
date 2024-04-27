<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\TransactionController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




// Route::apiResource('categories', CategorieController::class);
Route::get('category/state-and-user', [CategorieController::class, 'getByStateAndUserId']);
// Route::post('categories/{category}', [CategorieController::class, 'update'])->name('categories.update');
Route::prefix('api')->group(function () {

    // Custom route for updating a category
});
Route::get('categories', [CategorieController::class, 'index'])->name('categories.index');
Route::post('categories', [CategorieController::class, 'store'])->name('categories.store');
Route::get('categories/{category}', [CategorieController::class, 'show'])->name('categories.show');
Route::get('category-budget', [CategorieController::class, 'showBudget']);
Route::delete('categories/{category}', [CategorieController::class, 'destroy'])->name('categories.destroy');
Route::post('categories/{category}', [CategorieController::class, 'updateWithImage'])->name('categories.update');


Route::apiResource('transaction', TransactionController::class);
