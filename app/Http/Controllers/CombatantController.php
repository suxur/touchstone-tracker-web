<?php

namespace App\Http\Controllers;

use App\Events\UpdateEncounter;
use App\Models\Combatant;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CombatantController extends Controller
{
    /**
     * @param Request $request
     * @param Combatant $combatant
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function update(Request $request, Combatant $combatant): RedirectResponse
    {
        $this->authorize('update', $combatant->encounter);

        $combatant->fill($request->except([
            'id',
            'created_at',
            'updated_at',
            'stat_block',
        ]));
        $combatant->save();

        UpdateEncounter::dispatch($combatant->encounter);
        return back(303);
    }
}