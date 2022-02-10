<?php

namespace App\Actions\StatBlock;

use App\Contracts\StatBlockRequestParser;
use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CreateStatBlock
{
    public ?User $user = null;
    public StatBlockRequestParser $parser;

    public function __construct(StatBlockRequestParser $parser)
    {
        $this->parser = $parser;
    }

    /**
     * @param User|null $user
     * @param array $requestData
     * @return StatBlock|Model
     * @throws ValidationException
     */
    public function create(?User $user, array $requestData)
    {
        $this->user = $user;

        Validator::make($requestData, [
            'name'        => ['required', 'string', 'max:255'],
            'armor_class' => ['required', 'integer'],
            'hit_points'  => ['required', 'integer'],
            'race'        => ['string'],
            'class'       => ['string'],
        ])->validate();

        $parsedFormData = $this->parser->parse($requestData);
        $statBlock = StatBlock::create($parsedFormData);
        $statBlock->specialAbilities()->createMany($parsedFormData['traits']);
        $statBlock->actions()->createMany($parsedFormData['actions']);
        $statBlock->reactions()->createMany($parsedFormData['reactions']);
        $statBlock->legendaryActions()->createMany($parsedFormData['legendary_actions']);

        return $statBlock;
    }
}
