<?php

namespace App\Http\Controllers\Api;

use App\Events\UpdateEncounter;
use App\Http\Controllers\Controller;
use App\Http\Resources\CombatantResource;
use App\Http\Resources\EncounterResource;
use App\Models\Combatant;
use App\Models\Encounter;
use App\Models\StatBlock;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CombatantController extends Controller
{
    public function index(Encounter $encounter): AnonymousResourceCollection
    {
        return CombatantResource::collection($encounter->combatants()->get());
    }

    /**
     * Add Combatant
     *
     * @param Request $request
     * @param Encounter $encounter
     * @return AnonymousResourceCollection
     * @throws ValidationException
     */
    public function add(Request $request, Encounter $encounter): AnonymousResourceCollection
    {
        $data = Validator::make($request->all(), [
            'name' => 'required|string',
            'type' => 'required|string',
        ])->validate();

        $order = $encounter->combatants_count;

        $encounter->combatants()->create([
            'name'  => $data['name'],
            'type'  => $data['type'],
            'order' => $order,
        ]);

        UpdateEncounter::dispatch($encounter);
        return CombatantResource::collection($encounter->combatants()->get());
    }

    /**
     * Add Combatant
     *
     * @param Request $request
     * @param Encounter $encounter
     * @return AnonymousResourceCollection
     * @throws ValidationException
     */
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





    /**
     * @param Request $request
     * @param Combatant $combatant
     * @return EncounterResource
     * @throws AuthorizationException
     */
    public function update(Request $request, Combatant $combatant): EncounterResource
    {
        $this->authorize('update', $combatant->encounter);

        $combatant->fill($request->except([
            'id',
            'created_at',
            'updated_at',
            'stat_block',
        ]));
        $combatant->save();

        $encounter = $combatant->encounter->fresh();

        UpdateEncounter::dispatch($encounter);
        return new EncounterResource($encounter);
    }

}