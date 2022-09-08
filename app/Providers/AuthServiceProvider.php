<?php

namespace App\Providers;

use App\Encounters\Permissions;
use App\Models\Combatant;
use App\Models\StatBlock;
use App\Models\Encounter;
use App\Models\Team;
use App\Policies\CombatantPolicy;
use App\Policies\EncounterPolicy;
use App\Policies\StatBlockPolicy;
use App\Policies\TeamPolicy;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Combatant::class => CombatantPolicy::class,
        Team::class      => TeamPolicy::class,
        StatBlock::class => StatBlockPolicy::class,
        Encounter::class => EncounterPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        ResetPassword::createUrlUsing(function ($notifiable, $token) {
            return config('app.url') . "/reset-password/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        Gate::define(Permissions::EDIT, function ($user, $encounter) {
            return $user->id === $encounter->user_id;
        });
    }
}
