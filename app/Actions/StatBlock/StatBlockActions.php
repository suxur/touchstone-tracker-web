<?php

namespace App\Actions\StatBlock;

use Illuminate\Support\Facades\Validator;

class StatBlockActions
{
    protected function validate(array $requestData)
    {
        Validator::make($requestData, [
            'name'        => ['required', 'string', 'max:255'],
            'armor_class' => ['required', 'integer'],
            'hit_points'  => ['required', 'integer'],
            'race'        => ['string', 'nullable'],
            'class'       => ['string', 'nullable'],
        ])->validate();
    }
}
