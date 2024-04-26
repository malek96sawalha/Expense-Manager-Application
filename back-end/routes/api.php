<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
<<<<<<< HEAD
use App\Http\Controllers\CategorieController;
=======
use App\Http\Controllers\ExpenseController;
>>>>>>> 2cd343d36f79af813b176d37ef252c15f204052c

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
Route::apiResource('categories', CategorieController::class);
// Route::get('/categories', [CategorieController::class, 'index']);

Route::apiResource('expense', ExpenseController::class);
