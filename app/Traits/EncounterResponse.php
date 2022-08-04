<?php

namespace App\Traits;

use App\Events\UpdateEncounter;
use App\Http\Resources\EncounterResource;
use App\Models\Encounter;

trait EncounterResponse
{
    public function returnResponse(Encounter $encounter): EncounterResource
    {
        UpdateEncounter::dispatch($encounter->fresh());
        return new EncounterResource($encounter->fresh());
    }
}
