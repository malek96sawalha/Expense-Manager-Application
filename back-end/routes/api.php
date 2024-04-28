<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
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
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show'])->middleware('cors');

Route::get('/get-csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
})->middleware('cors');
// Route::apiResource('categories', CategorieController::class);

Route::get('category/state-and-user', [CategorieController::class, 'getByStateAndUserId']);
Route::prefix('api')->group(function () {

    // Custom route for updating a category
});
Route::get('categories', [CategorieController::class, 'index'])->name('categories.index');
Route::post('categories/add', [CategorieController::class, 'store'])->name('categories.store')->middleware('auth:sanctum');
Route::get('categories/{category}', [CategorieController::class, 'show'])->name('categories.show');
Route::get('category-budget', [CategorieController::class, 'showBudget']);
Route::delete('deleteCategories/{category}', [CategorieController::class, 'destroy'])->name('categories.destroy');
Route::post('categories/{id}', [CategorieController::class, 'updateWithImage'])->name('categories.update');



// Route::apiResource('transaction', TransactionController::class);
Route::post('transaction/description/{id}', [TransactionController::class, 'description'])->name('description.update');
Route::apiResource('transaction', TransactionController::class);
Route::get('TransactionData', [TransactionController::class, 'TransactionData']);

Route::post('login', [AuthenticatedSessionController::class, 'store']);

Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

Route::get('register', [RegisteredUserController::class, 'create'])
    ->name('register');

Route::post('register', [RegisteredUserController::class, 'store']);
