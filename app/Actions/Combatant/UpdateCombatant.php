<?php

namespace App\Actions\Combatant;

use App\Models\Combatant;
use Illuminate\Support\Facades\Gate;

class UpdateCombatant
{
  public function update(Combatant $combatant, array $input)
  {
    Gate::authorize("update", $combatant);

    $combatant->fill($input);
    $combatant = $this->syncConditions($combatant, $input);
    $combatant->save();
  }

  private function syncConditions(Combatant $combatant, array $input): Combatant
  {
      if (empty($input["conditions"])) return $combatant;

      $combatant->conditions()->sync(collect($input["conditions"])->pluck("id"));
      return $combatant;
  }
}
