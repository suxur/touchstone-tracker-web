<?php

namespace App\Actions\StatBlock;

use App\Contracts\StatBlockRequestParser;
use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class UpdateStatBlock extends StatBlockActions
{
    public ?User $user = null;
    public StatBlockRequestParser $parser;

    public function __construct(StatBlockRequestParser $parser)
    {
        $this->parser = $parser;
    }

    /**
     * @param User|null $user
     * @param StatBlocka $statBlock
     * @param array $requestData
     * @return StatBlock|Model
     * @throws ValidationException
     */
    public function update(?User $user, StatBlock $statBlock, array $requestData)
    {
        Gate::forUser($user)->authorize('update', $statBlock);

        $this->user = $user;

        $this->validate($requestData);

        $parsedFormData = $this->parser->parse($requestData);
        $statBlock->fill($parsedFormData);
        $statBlock->specialAbilities()->createMany($parsedFormData['traits']);
        $statBlock->actions()->createMany($parsedFormData['actions']);
        $statBlock->reactions()->createMany($parsedFormData['reactions']);
        $statBlock->legendaryActions()->createMany($parsedFormData['legendary_actions']);
        $statBlock->save();

        return $statBlock;
    }
}
