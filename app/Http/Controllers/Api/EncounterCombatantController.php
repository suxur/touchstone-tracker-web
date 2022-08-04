<?php

namespace App\Http\Controllers\Api;

use App\Actions\Combatant\AddCombatant;
use App\Actions\StatBlock\CreateStatBlock;
use App\Http\Controllers\Controller;
use App\Http\Resources\CombatantResource;
use App\Http\Resources\EncounterResource;
use App\Models\Combatant;
use App\Models\Encounter;
use App\Traits\EncounterResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EncounterCombatantController extends Controller
{
    use EncounterResponse;

    public function index(Encounter $encounter): AnonymousResourceCollection
    {
        return CombatantResource::collection($encounter->combatants()->get());
    }

    public function store(Request $request, Encounter $encounter): EncounterResource
    {
        $statBlock = app(CreateStatBlock::class)->create($request->all());

        app(AddCombatant::class)->add($encounter, $statBlock);

        return $this->returnResponse($encounter);
    }

    public function destroy(Encounter $encounter, Combatant $combatant): EncounterResource
    {
        $combatant->delete();

        return $this->returnResponse($encounter);
    }
}
