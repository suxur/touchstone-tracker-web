<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EncounterController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\MonsterController;
use App\Http\Controllers\SpellController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
require __DIR__ . '/auth.php';
Route::get('/', [WelcomeController::class, 'index'])->middleware('guest')->name('welcome');

Route::get('/e', [EncounterController::class, 'index'])->name('encounter');
Route::get('/e/active', [EncounterController::class, 'active'])->name('encounter.active');
Route::post('/e/lookup', [EncounterController::class, 'lookup'])->name('encounter.lookup');

Route::get('/p/{slug}', [EncounterController::class, 'player'])->name('encounter.player');

Route::post('/encounter/{encounter}/save', [EncounterController::class, 'save'])->name('encounter.save');
Route::post('/encounter/{encounter}/clear', [EncounterController::class, 'clear'])->name('encounter.clear');
Route::post('/encounter/{encounter}/update', [EncounterController::class, 'update'])->name('encounter.update');
Route::post('/encounter/{encounter}/destroy', [EncounterController::class, 'destroy'])->name('encounter.destroy');
Route::post('/encounter/{encounter}/add/{type}', [EncounterController::class, 'add'])->name('encounter.add');
Route::post('/encounter/{encounter}/remove', [EncounterController::class, 'remove'])->name('encounter.remove');

Route::get('/monster/{monster}', [MonsterController::class, 'monster'])->name('monster');
Route::post('/monster/{monster}/duplicate', [MonsterController::class, 'duplicate'])->name('monster.duplicate');
Route::get('/character/{character}', [CharacterController::class, 'character'])->name('character');
Route::post('/character/{character}/duplicate', [CharacterController::class, 'duplicate'])->name('character.duplicate');
Route::post('/characters/{character}/claim', [CharacterController::class, 'claim'])->name('characters.claim');

Route::post('/characters', [CharacterController::class, 'store'])->name('characters.store');
Route::put('/characters/{character}', [CharacterController::class, 'update'])->name('characters.update');
Route::post('/monsters', [MonsterController::class, 'store'])->name('monster.store');
Route::put('/monsters/{monster}', [MonsterController::class, 'update'])->name('monster.update');

Route::get('/spell/{spell}', [SpellController::class, 'spell'])->name('spell');

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/profile');
    Route::get('/e/{slug}', [EncounterController::class, 'owner'])->name('encounter.owner');
    Route::get('/encounters', [EncounterController::class, 'encounters'])->name('encounters');

    Route::get('/characters', [CharacterController::class, 'index'])->name('characters');
    Route::delete('/characters/{character}', [CharacterController::class, 'destroy'])->name('characters.destroy');

    Route::delete('/monsters/{monster}', [MonsterController::class, 'destroy'])->name('monsters.destroy');
});

Route::group(['middleware' => config('jetstream.middleware', ['web'])], function () {
    Route::group(['middleware' => ['auth', 'verified']], function () {
        Route::get('/monsters', [MonsterController::class, 'index'])
            ->name('monsters');
        Route::post('/monsters/import', [MonsterController::class, 'import'])
            ->name('monsters.import');
    });
});
