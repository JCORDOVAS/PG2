<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group([

    'prefix' => 'users',
    //'prefix' => 'auth'

], function ($router) {
    Route::post('/register', [JWTController::class, 'register'])->name('register');
    Route::post('/login', [JWTController::class, 'loginAdmin'])->name('login');
    Route::post('/logout', [JWTController::class, 'logout'])->name('logout');
    Route::post('/refresh', [JWTController::class, 'refresh'])->name('refresh');
    Route::post('/profile', [JWTController::class, 'profile'])->name('profile');

    Route::prefix('admin')->group(function() {
        Route::get('/all', [UserController::class, 'index']);
        Route::post('/register', [UserController::class, 'store']);
        Route::put('/update/{id}', [UserController::class, 'update']);
        Route::delete('/delete/{id}', [UserController::class, 'destroy']);
    });
});