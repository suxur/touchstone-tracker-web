<?php

namespace App\Actions\Jetstream;

use App\Models\Monster;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Gate;

class RemoveMonster
{
    /**
     * Remove the team member from the given team.
     *
     * @param User    $user
     * @param Monster $monster
     * @return void
     * @throws AuthorizationException
     */
    public function remove(User $user, Monster $monster): void
    {
        $this->authorize($user, $monster);

        $user->removeMonster($monster);

        // TODO Add CharacterRemoved Event
        // CharacterRemoved::dispatch($team, $teamMember);
    }

    /**
     * Authorize that the user can remove the team member.
     *
     * @param User    $user
     * @param Monster $monster
     * @return void
     * @throws AuthorizationException
     */
    protected function authorize(User $user, Monster $monster): void
    {
        if (!Gate::forUser($user)->check('update', $monster)) {
            throw new AuthorizationException;
        }
    }
}
