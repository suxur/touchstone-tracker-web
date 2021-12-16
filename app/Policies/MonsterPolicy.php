<?php

namespace App\Policies;

use App\Models\Monster;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MonsterPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can remove character.
     *
     * @param User    $user
     * @param Monster $monster
     * @return bool
     */
    public function update(User $user, Monster $monster): bool
    {
        if ($user->ownsMonster($monster)) {
            return true;
        }

        return false;
    }
}
