<?php

namespace App\Policies;

use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CharacterPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update a character.
     *
     * @param User      $user
     * @param StatBlock $character
     * @return bool
     */
    public function update(User $user, StatBlock $character): bool
    {
        return $user->ownsStatBlock($character);
    }

    public function claim(User $user, StatBlock $character): bool
    {
        return ($character->user_id === null && $user->belongsToTeam($character->team));
    }

    /**
     * Determine whether the user can remove character.
     *
     * @param User      $user
     * @param StatBlock $character
     * @return bool
     */
    public function removeCharacter(User $user, StatBlock $character): bool
    {
        if ($user->ownsStatBlock($character)) {
            return true;
        }

        if ($team = $character->team) {
            return $user->hasTeamRole($team, 'dm');
        }

        return false;
    }
}
