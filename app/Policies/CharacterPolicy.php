<?php

namespace App\Policies;

use App\Models\Character;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CharacterPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update a character.
     *
     * @param User      $user
     * @param Character $character
     * @return bool
     */
    public function update(User $user, Character $character): bool
    {
        return $user->ownsCharacter($character);
    }

    public function claim(User $user, Character $character): bool
    {
        return ($character->user_id === null && $user->belongsToTeam($character->team));
    }

    /**
     * Determine whether the user can remove character.
     *
     * @param User      $user
     * @param Character $character
     * @return bool
     */
    public function removeCharacter(User $user, Character $character): bool
    {
        if ($user->ownsCharacter($character)) {
            return true;
        }

        if ($team = $character->team) {
            return $user->hasTeamRole($team, 'dm');
        }

        return false;
    }
}
