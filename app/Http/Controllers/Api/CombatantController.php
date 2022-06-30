<?php

namespace App\Http\Controllers\Api;

use App\Actions\Combatant\CreateCombatant;
use App\Actions\Combatant\UpdateCombatant;
use App\Events\UpdateEncounter;
use App\Http\Controllers\Controller;
use App\Http\Resources\CombatantResource;
use App\Http\Resources\EncounterResource;
use App\Models\Combatant;
use App\Models\Encounter;
use App\Models\StatBlock;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Validator;

class CombatantController extends Controller
{
    public function index(Encounter $encounter): AnonymousResourceCollection
    {
        return CombatantResource::collection($encounter->combatants()->get());
    }

    public function add(Request $request, Encounter $encounter): AnonymousResourceCollection
    {
        app(CreateCombatant::class)->create($encounter, $request->all());
        UpdateEncounter::dispatch($encounter);
        return CombatantResource::collection($encounter->combatants()->get());
    }

    public function addCombatants(Request $request, Encounter $encounter): AnonymousResourceCollection
    {
        $data = Validator::make($request->all(), [
            'ids' => 'required',
        ])->validate();

        $statBlocks = StatBlock::find($data['ids']);

        $order = $encounter->combatants_count;

        $combatants = [];
        foreach ($statBlocks as $key => $statBlock) {
            $combatants[] = [
                'name'  => $statBlock['name'],
                'type'  => $statBlock['type'],
                'order' => $key + $order,
            ];
        }

        $encounter->combatants()->createMany($combatants);

        UpdateEncounter::dispatch($encounter);
        return CombatantResource::collection($encounter->combatants()->get());
    }

    public function update(Request $request, Combatant $combatant): EncounterResource
    {
        app(UpdateCombatant::class)->update($combatant, $request->all());
        $encounter = $combatant->encounter->fresh();
        UpdateEncounter::dispatch($encounter);
        return new EncounterResource($encounter);
    }
}

