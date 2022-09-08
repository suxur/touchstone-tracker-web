<?php

use App\Http\Controllers\Api\CharacterController;
use App\Http\Controllers\Api\CodexController;
use App\Http\Controllers\Api\CombatantController;
use App\Http\Controllers\Api\ConditionController;
use App\Http\Controllers\Api\EncounterCombatantController;
use App\Http\Controllers\Api\EncounterController;
use App\Http\Controllers\Api\PreloadedMonsterController;
use App\Http\Controllers\Api\SpellController;
use App\Http\Controllers\Api\StatBlockController;
use App\Http\Controllers\Api\MonsterController;
use App\Http\Controllers\Auth\SanctumTokenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/sanctum/token", [SanctumTokenController::class, "store"]);


Route::post("/encounters/{encounter}/clear", [
    EncounterController::class,
    "clear",
])->name("api.encounter.clear");

Route::post("/encounters/{encounter}/add/combatants", [
    CombatantController::class,
    "addCombatants",
])->name("api.encounter.add.combatants");

Route::post("/encounters/{encounter}/add/combatant/{stat_block}", [
    EncounterController::class,
    "addByStatBlock",
])->name("api.encounters.add.stat-block");

Route::post("/encounters/{encounter}/combatants/order", [
    EncounterController::class,
    "order",
])->name("api.encounters.combatants.order");

/* Codex */
Route::get("/codex/monsters", [CodexController::class, "monsters"])->name(
    "codex.monsters"
);
Route::get("/codex/characters", [CodexController::class, "characters"])->name(
    "codex.characters"
);
Route::get("/codex/spells", [CodexController::class, "spells"])->name(
    "codex.spells"
);

Route::get("/conditions", [ConditionController::class, "index"])->name(
    "api.conditions.index"
);




Route::post("/stat-blocks/import", [
    StatBlockController::class,
    "import",
])->name("api.stat-blocks.import");

Route::get("/monster/{monster}", [MonsterController::class, "monster"])->name(
    "monster"
);

// Un-Authenticated
Route::name("api.")->group(function () {
    Route::apiResource("preloaded-monsters", PreloadedMonsterController::class)
        ->only(["index"]);

    Route::apiResource("combatants", CombatantController::class)->only(["update"]);

    Route::apiResource("encounters", EncounterController::class)->except([
        "index",
        "store",
        "destroy",
    ]);

    Route::apiResource(
        "encounters.combatants",
        EncounterCombatantController::class
    );

    Route::apiResource("spells", SpellController::class)
        ->only(["show"]);

    Route::apiResource("stat-blocks", StatBlockController::class);
});

Route::middleware(["auth:sanctum", "verified"])->get("/user", function (
    Request $request
) {
    return $request->user();
    //    return new UserResource($request->user());
});

// Authenticated Route
Route::group(["middleware" => ["auth:sanctum"]], function () {
    /* Codex */
    Route::get("/codex/encounters", [CodexController::class, "encounters"])->name(
        "codex.encounters"
    );

    Route::name("api.")->group(function () {
        Route::apiResource("encounters", EncounterController::class)->only([
            "store",
            "destroy",
        ]);

        Route::apiResource("monsters", MonsterController::class)
            ->only(["index"]);

        Route::apiResource("characters", CharacterController::class)
            ->only(["index"]);
    });
});