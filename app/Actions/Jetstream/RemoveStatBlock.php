<?php

namespace App\Actions\Jetstream;

use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Gate;

class RemoveStatBlock
{
    /**
     * @throws AuthorizationException
     */
    public function remove(User $user, StatBlock $statBlock): void
    {
        $this->authorize($user, $statBlock);
        $user->removeStatBlock($statBlock);
    }

    /**
     * @throws AuthorizationException
     */
    protected function authorize(User $user, StatBlock $statBlock): void
    {
        if (!Gate::forUser($user)->check('removeStatBlock', $statBlock)) {
            throw new AuthorizationException;
        }
    }
}
