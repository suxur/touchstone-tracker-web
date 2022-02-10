<?php

use App\Http\Controllers\Api\CodexController;
use App\Http\Controllers\Api\CombatantController;
use App\Http\Controllers\Api\EncounterController;
use App\Http\Controllers\Api\SpellController;
use App\Http\Controllers\MonsterController;
use App\Http\Controllers\Api\StatBlockController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

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
Route::post('/sanctum/token', function (Request $request) {
    $request->validate([
        'email'       => 'required|email',
        'password'    => 'required',
        'device_name' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return response()->json([
        'user'  => $user,
        'token' => $user->createToken($request->device_name)->plainTextToken
    ]);
});


Route::middleware(['auth:sanctum', 'verified'])->get('/user', function (Request $request) {
    return $request->user();
//    return new UserResource($request->user());
});

Route::post('/combatant/{combatant}', [CombatantController::class, 'update'])->name('api.combatants.update');
Route::get('/encounters/{encounter}/combatants', [CombatantController::class, 'index'])->name('api.combatants.index');

Route::get('/encounters', [EncounterController::class, 'index'])->name('api.encounters.index');
Route::post('/encounters/{encounter}/clear', [EncounterController::class, 'clear'])->name('api.encounter.clear');
Route::get('/encounters/{encounter}', [EncounterController::class, 'show'])->name('api.encounters.show');
Route::post('/encounters/{encounter}/update', [EncounterController::class, 'update'])->name('api.encounters.update');

Route::post('/encounters/{encounter}/add/combatant', [CombatantController::class, 'add'])->name('api.encounters.combatants.add');
Route::post('/encounters/{encounter}/add/combatants', [CombatantController::class, 'addCombatants'])->name('api.encounter.add.combatants');
Route::post('/encounters/{encounter}/add/combatant/{stat_block}', [EncounterController::class, 'addByStatBlock'])->name('api.encounters.add.stat-block');
Route::post('/encounters/{encounter}/remove/combatant/{combatant}', [EncounterController::class, 'remove'])->name('api.encounters.remove');

Route::post('/encounters/{encounter}/combatants/order', [EncounterController::class, 'order'])->name('api.encounters.combatants.order');


/** Codex */
Route::get('/codex/monsters', [CodexController::class, 'monsters'])->name('codex.monsters');
Route::get('/codex/characters', [CodexController::class, 'characters'])->name('codex.characters');
Route::get('/codex/spells', [CodexController::class, 'spells'])->name('codex.spells');

Route::get('/stat-blocks/monsters', [StatBlockController::class, 'monsters'])->name('api.stat-blocks.monsters');
Route::get('/stat-blocks/characters', [StatBlockController::class, 'characters'])->name('api.stat-blocks.characters');
Route::get('/stat-blocks/{stat_block}', [StatBlockController::class, 'show'])->name('api.stat-blocks.show');
Route::post('/stat-blocks', [StatBlockController::class, 'store'])->name('api.stat-blocks.store');

Route::get('/monster/{monster}', [MonsterController::class, 'monster'])->name('monster');
Route::get('/spell/{spell}', [SpellController::class, 'spell'])->name('api.spell');

Route::group(['middleware' => ['auth:sanctum']], function () {
    /** Codex */
    Route::get('/codex/encounters', [CodexController::class, 'encounters'])->name('codex.encounters');
});
