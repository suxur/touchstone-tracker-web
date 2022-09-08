<?php

namespace App\Policies;

use App\Models\Encounter;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EncounterPolicy
{
    use HandlesAuthorization;

    public function owner(?User $user, Encounter $encounter): bool
    {
        return $this->isUserEncounter($user, $encounter) || $this->isSessionEncounter($encounter);
    }

    /**
     * @deprecated
     */
    public function update(?User $user, Encounter $encounter): bool
    {
        return $this->owner($user, $encounter);
    }

    private function isUserEncounter(?User $user, Encounter $encounter): bool
    {
        return optional($user)->id === $encounter->user_id;
    }

    private function isSessionEncounter(Encounter $encounter): bool
    {
        return session('encounter_slug') === $encounter->slug;
    }
}
