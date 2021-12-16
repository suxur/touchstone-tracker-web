<?php

use App\Http\Controllers\Api\EncounterController;
use App\Http\Controllers\MonsterController;
use App\Http\Controllers\SpellController;
use App\Http\Resources\CodexEncounterResource;
use App\Http\Resources\CodexMonsterResource;
use App\Http\Resources\CodexSpellResource;
use App\Http\Resources\UserResource;
use App\Models\Monster;
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

Route::get('/encounter', [EncounterController::class, 'index']);

Route::get('/e', [EncounterController::class, 'index'])->name('encounter');
Route::get('/e/{slug}', [EncounterController::class, 'owner'])->name('encounter.owner');
Route::get('/e/active', [EncounterController::class, 'active'])->name('encounter.active');
Route::post('/e/lookup', [EncounterController::class, 'lookup'])->name('encounter.lookup');
Route::post('/encounter/{encounter}/add/{type}', [EncounterController::class, 'add'])->name('encounter.add');
Route::post('/encounter/{encounter}/remove', [EncounterController::class, 'remove'])->name('encounter.remove');


Route::get('/codex/monsters', function () {
    $monsters = Monster::select(['id', 'name', 'hit_points', 'dexterity'])->without('specialAbilities', 'actions', 'reactions', 'legendaryActions')->get();
    return CodexMonsterResource::collection($monsters);
});

Route::get('/codex/spells', function () {
    return CodexSpellResource::collection(Spell::all());
});

Route::get('/codex/encounters', function () {
    return CodexEncounterResource::collection([]);
});

Route::get('/monster/{monster}', [MonsterController::class, 'monster'])->name('monster');
Route::get('/spell/{spell}', [SpellController::class, 'spell'])->name('spell');
