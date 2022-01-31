<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\CombatantController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EncounterController;
use App\Http\Controllers\MonsterController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\StatBlockController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

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
Route::get('/', [WelcomeController::class, 'index'])->middleware('guest')->name('welcome');

/* Encounter Routes */
Route::get('/e', [EncounterController::class, 'index'])->name('encounter');
Route::post('/e/lookup', [EncounterController::class, 'lookup'])->name('encounter.lookup');

/* Player Routes */
Route::get('/p/{slug}', [PlayerController::class, 'show'])->name('player.show');

/* Encounter Action Routes */
Route::post('/encounter/{encounter}/clear', [EncounterController::class, 'clear'])->name('encounter.clear');
Route::post('/encounter/{encounter}/update', [EncounterController::class, 'update'])->name('encounters.update');
Route::post('/encounter/{encounter}/add/combatant', [EncounterController::class, 'add'])->name('encounter.add.combatant');
Route::post('/encounter/{encounter}/add/combatants', [EncounterController::class, 'addCombatants'])->name('encounter.add.combatants');
Route::post('/encounter/{encounter}/add/combatant/{stat_block}', [EncounterController::class, 'addByStatBlock'])->name('encounter.add.stat-block');
Route::post('/encounter/{encounter}/remove/combatant/{combatant}', [EncounterController::class, 'remove'])->name('encounter.remove');
Route::post('/encounter/{encounter}/create/monster', [EncounterController::class, 'createMonster'])->name('encounter.create.monster');
Route::post('/encounter/{encounter}/add/monster/{monster}', [EncounterController::class, 'addMonster'])->name('encounter.add.monster');

Route::post('/combatant/{combatant}', [CombatantController::class, 'update'])->name('combatants.update');

Route::post('/stat-blocks', [StatBlockController::class, 'store'])->name('stat_block.store');
Route::put('/stat-blocks/{stat_block}', [StatBlockController::class, 'update'])->name('stat_block.update');

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/profile');
    Route::get('/e/{slug}', [EncounterController::class, 'owner'])->name('encounter.owner');
    Route::get('/encounters', [EncounterController::class, 'encounters'])->name('encounters');
    Route::post('/encounters/create', [EncounterController::class, 'create'])->name('encounters.create');
    Route::delete('/encounter/{encounter}/destroy', [EncounterController::class, 'destroy'])->name('encounter.destroy');

    /* Characters */
    Route::resource('characters', CharacterController::class);
    Route::post('/characters/{character}/claim', [CharacterController::class, 'claim'])->name('characters.claim');
    Route::post('/characters/{character}/clone', [CharacterController::class, 'clone'])->name('characters.clone');

    /** Monsters */
    Route::resource('monsters', MonsterController::class);

    /** Stat Blocks */
    Route::resource('stat-blocks', StatBlockController::class);
    Route::post('/stat-blocks/{stat_block}/type/{type}/clone', [StatBlockController::class, 'clone'])->name('stat_block.clone');
});

Route::group(['middleware' => config('jetstream.middleware', ['web'])], function () {
    Route::group(['middleware' => ['auth', 'verified']], function () {
        Route::get('/monsters', [MonsterController::class, 'index'])
            ->name('monsters');
        Route::post('/monsters/import', [MonsterController::class, 'import'])
            ->name('monsters.import');
    });
});
