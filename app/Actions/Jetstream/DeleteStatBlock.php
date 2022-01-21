<?php

namespace App\Actions\Jetstream;

use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Gate;

class DeleteStatBlock
{
    /**
     * Remove the team member from the given team.
     *
     * @param User $user
     * @param StatBlock $statBlock
     * @return void
     * @throws AuthorizationException
     */
    public function delete(User $user, StatBlock $statBlock): void
    {
        $this->authorize($user, $statBlock);

        $user->removeStatBlock($statBlock);

        // TODO Add StatBlockDeleted Event
        // StatBlockDeleted::dispatch($statBlock);
    }

    /**
     * Authorize that the user can remove the team member.
     *
     * @param User $user
     * @param StatBlock $statBlock
     * @return void
     * @throws AuthorizationException
     */
    protected function authorize(User $user, StatBlock $statBlock): void
    {
        if (!Gate::forUser($user)->check('removeStatBlock', $statBlock)) {
            throw new AuthorizationException;
        }
    }
}
