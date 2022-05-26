<?php

namespace App\Policies;

use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StatBlockPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update a character.
     *
     * @param User      $user
     * @param StatBlock $character
     * @return bool
     */
    public function update(User $user, StatBlock $statBlock): bool
    {
        return $user->ownsStatBlock($statBlock);
    }

    public function claim(User $user, StatBlock $character): bool
    {
        return ($character->user_id === null && $user->belongsToTeam($character->team));
    }

    /**
     * Determine whether the user can remove character.
     *
     * @param User      $user
     * @param StatBlock $statBlock
     * @return bool
     */
    public function removeStatBlock(User $user, StatBlock $statBlock): bool
    {
        if ($user->ownsStatBlock($statBlock)) {
            return true;
        }

        if ($team = $statBlock->team) {
            return $user->hasTeamRole($team, 'dm');
        }

        return false;
    }
}
