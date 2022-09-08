<?php

namespace App\Policies;

use App\Models\Combatant;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CombatantPolicy
{
    use HandlesAuthorization;

    public function update(?User $user, Combatant $combatant): bool
    {
        if ($user) {
            return $user->id === $combatant->encounter->user_id;
        }

        if (session()->has('encounter_slug')) {
            return session('encounter_slug') === $combatant->encounter->slug;
        }

        return false;
    }
}
