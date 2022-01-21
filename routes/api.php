<?php

use App\Http\Controllers\Api\CodexController;
use App\Http\Controllers\Api\EncounterController;
use App\Http\Controllers\MonsterController;
use App\Http\Controllers\SpellController;
use App\Http\Resources\CodexCharacterResource;
use App\Http\Resources\CodexEncounterResource;
use App\Http\Resources\CodexMonsterResource;
use App\Http\Resources\CodexSpellResource;
use App\Http\Resources\UserResource;
use App\Models\StatBlock;
use App\Models\Spell;
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
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return response()->json([
        'user' => $user,
        'token' => $user->createToken($request->device_name)->plainTextToken
    ]);
});


Route::middleware(['auth:sanctum', 'verified'])->get('/user', function (Request $request) {
    return $request->user();
//    return new UserResource($request->user());
});

Route::get('/codex/monsters', [CodexController::class, 'monsters'])->name('codex.monsters');
Route::get('/codex/characters', [CodexController::class, 'characters'])->name('codex.characters');
Route::get('/codex/spells', [CodexController::class, 'spells'])->name('codex.spells');
Route::get('/codex/encounters', [CodexController::class, 'encounters'])->name('codex.encounters');

Route::get('stat-block/{stat_block}', [\App\Http\Controllers\StatBlockController::class, 'show'])->name('api.stat-block');
Route::get('/monster/{monster}', [MonsterController::class, 'monster'])->name('monster');
Route::get('/spell/{spell}', [SpellController::class, 'spell'])->name('spell');
