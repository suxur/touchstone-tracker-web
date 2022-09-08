<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EncounterController;
use App\Http\Controllers\MonsterController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/user/subscription', [SubscriptionController::class, "index"])->name("subscription.index");
Route::post('/user/subscription', [SubscriptionController::class, "update"])->name("subscription.update");
Route::post('/user/subscription/cancel', [SubscriptionController::class, "cancel"])->name("subscription.cancel");

Route::get('/billing-portal', function (Request $request) {
    return $request->user()->redirectToBillingPortal();
});

Route::group(["middleware" => ["guest"]], function () {
    Route::get("/", [WelcomeController::class, "index"])->name("welcome");
});

// Encounter Routes
Route::resource('e', EncounterController::class)->only('index', 'store');
//Route::get("/e", [EncounterController::class, "index"])
//    ->name("encounter");
//Route::post("/e/lookup", [EncounterController::class, "lookup"])
//    ->name("encounter.lookup");

// Player Routes
Route::get("/p/{slug}", [PlayerController::class, "show"])->name("player.show");

Route::middleware(["auth:sanctum", "verified"])
    ->get("/dashboard", [DashboardController::class, "index"])
    ->name("dashboard");

Route::group(
    ["middleware" => config("jetstream.middleware", ["web"])],
    function () {
        Route::group(["middleware" => ["auth", "verified"]], function () {
            Route::resource('e', EncounterController::class)->only('show');
            Route::get("/characters", [CharacterController::class, "index"])->name(
                "characters.index"
            );
            Route::get("/monsters", [MonsterController::class, "index"])->name(
                "monsters"
            );
        });
    }
);
