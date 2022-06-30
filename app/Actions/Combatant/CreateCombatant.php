<?php

namespace App\Actions\Combatant;

use App\Models\Encounter;
use Illuminate\Support\Facades\Validator;

class CreateCombatant
{
    public function create(Encounter $encounter, array $input)
    {
        $data = Validator::make($input, [
            'name' => 'required|string',
            'type' => 'required|string',
        ])->validate();

        $order = $encounter->combatants_count;

        $encounter->combatants()->create([
            'name'  => $data['name'],
            'type'  => $data['type'],
            'order' => $order,
        ]);
    }
}
