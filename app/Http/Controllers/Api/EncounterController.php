<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EncounterResource;
use App\Models\Encounter;
use App\Models\StatBlock;
use App\Models\User;
use App\Traits\EncounterResponse;
use function auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EncounterController extends Controller
{
  use EncounterResponse;

  public function store(): JsonResponse
  {
    /** @var User $user */
    $user = auth()->user();
    $slug = Str::random(8);

    $encounter = $user->encounters()->create([
      "slug" => $slug,
    ]);

    return response()->json($encounter);
  }

  public function destroy(Encounter $encounter): JsonResponse
  {
    $this->authorize("update", $encounter);

    return response()->json($encounter->delete());
  }

  public function update(
    Request $request,
    Encounter $encounter
  ): EncounterResource {
    $this->authorize("update", $encounter);

    if (empty($request->get("combatants"))) {
      $encounter->combatants()->delete();
    }

    $encounter->fill($request->all());

    foreach ($request->get("combatants") as $requestCombatant) {
      $this->updateCombatant($requestCombatant, $encounter);
    }

    $encounter->save();

    return $this->returnResponse($encounter);
  }

  public function addByStatBlock(
    Encounter $encounter,
    StatBlock $statBlock
  ): EncounterResource {
    $order = $encounter->combatants_count;

    $encounter->combatants()->create([
      "name" => $statBlock->name,
      "type" => $statBlock->stat_block_type,
      "current_hit_points" => $statBlock->hit_points,
      "hit_point_maximum" => $statBlock->hit_points,
      "armor_class" => $statBlock->armor_class,
      "initiative" => $statBlock->getDexterityModifierAttribute(),
      "order" => $order,
      "stat_block_id" => $statBlock->id,
    ]);

    return $this->returnResponse($encounter);
  }

  private function updateCombatant($data, $encounter)
  {
    $combatant = $encounter
      ->combatants()
      ->where("id", $data["id"])
      ->first();
    $combatant->fill($data);
    $combatant->save();
  }
}
