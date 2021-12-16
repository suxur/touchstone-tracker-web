<?php

namespace App\Actions\Jetstream;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Gate;

class RemoveCharacter
{
    /**
     * Remove the team member from the given team.
     *
     * @param mixed $user
     * @param mixed $character
     * @return void
     * @throws AuthorizationException
     */
    public function remove($user, $character): void
    {
        $this->authorize($user, $character);

        $user->removeCharacter($character);

        // TODO Add CharacterRemoved Event
        // CharacterRemoved::dispatch($team, $teamMember);
    }

    /**
     * Authorize that the user can remove the team member.
     *
     * @param mixed $user
     * @param mixed $character
     * @return void
     * @throws AuthorizationException
     */
    protected function authorize($user, $character): void
    {
        if (!Gate::forUser($user)->check('removeCharacter', $character)) {
            throw new AuthorizationException;
        }
    }
}
