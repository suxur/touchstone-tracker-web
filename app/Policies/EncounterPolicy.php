<?php

namespace App\Policies;

use App\Models\Encounter;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EncounterPolicy
{
    use HandlesAuthorization;

    public function update(?User $user, Encounter $encounter): bool
    {
        return session()->get('encounter_slug') === $encounter->slug || optional($user)->id === $encounter->user_id;
    }
}
