<?php

namespace App\Actions\Combatant;

use App\Models\Combatant;
use Illuminate\Support\Facades\Gate;

class UpdateCombatant
{
  public function update(Combatant $combatant, array $input)
  {
    Gate::authorize("update", $combatant->encounter);

    $combatant->fill($input);
    $combatant->conditions()->sync(collect($input["conditions"])->pluck("id"));
    $combatant->save();
  }
}
