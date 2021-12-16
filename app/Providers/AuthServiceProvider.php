<?php

namespace App\Providers;

use App\Encounters\Permissions;
use App\Models\Character;
use App\Models\Encounter;
use App\Models\Team;
use App\Policies\CharacterPolicy;
use App\Policies\EncounterPolicy;
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
        Team::class      => TeamPolicy::class,
        Character::class => CharacterPolicy::class,
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

        ResetPassword::createUrlUsing(function($notifiable, $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        Gate::define(Permissions::EDIT, function ($user, $encounter) {
            return $user->id === $encounter->user_id;
        });
    }
}
