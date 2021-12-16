<?php

namespace App\Providers;

use App\Models\Encounter;
use App\Models\Monster;
use Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;
use App\Models\Character;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->isLocal()) {
            $this->app->register(IdeHelperServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::morphMap([
            Encounter::COMBATANT_CHARACTER => Character::class,
            Encounter::COMBATANT_MONSTER   => Monster::class,
        ]);

        JsonResource::withoutWrapping();
    }
}
