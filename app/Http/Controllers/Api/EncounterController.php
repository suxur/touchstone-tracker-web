<?php

namespace App\Http\Controllers\Api;

use App\Encounters\Encounters;
use App\Events\UpdateEncounter;
use App\Http\Controllers\Controller;
use App\Http\Resources\EncounterResource;
use App\Models\Combatant;
use App\Models\Encounter;
use App\Models\StatBlock;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use function auth;
use function redirect;
use function session;

class EncounterController extends Controller
{
    public function index(): JsonResponse
    {
        $slug = session('encounter_slug') ?? Str::random(8);
//        $slug = 'zPq6XQ0h';

        $encounter = Encounter::firstOrCreate([
            'slug' => $slug,
        ]);

        session(['encounter_slug' => $encounter->slug]);

        return response()->json($encounter);
    }

    public function show(Encounter $encounter): EncounterResource
    {
        return new EncounterResource($encounter);
    }

    public function lookup(Request $request): RedirectResponse
    {
        Validator::make($request->all(), [
            'lookup' => 'required|string',
        ], [
            'lookup.required' => 'Please enter an Encounter ID or URL.',
        ])->validate();

        if ($lookup = $request->get('lookup')) {
            $slug = Encounters::lookup($lookup);
            return redirect()->route('player.show', ['slug' => $slug]);
        }

        // Show errors...
        return back();
    }

    /**
     * Owner
     *
     * @param $slug
     * @return JsonResponse
     */
    public function owner($slug): JsonResponse
    {
        $encounter = Encounter::whereSlug($slug)->firstOrFail();

        return response()->json($encounter);
    }

    public function player($slug): Response
    {
        $encounter = Encounter::where(['slug' => $slug])->firstOrFail();

        $characterIds = [];
        /** @var User $user */
        if ($user = auth()->user()) {
            $characterIds = $user->characters->pluck('id');
        }

        return Inertia::render('Encounter/Player', [
            'init'          => $encounter,
            'character_ids' => $characterIds
        ]);
    }

    public function active(): RedirectResponse
    {
        if ($slug = session()->get('encounter_slug')) {
            return redirect()->route('encounter.owner', ['slug' => $slug]);
        }

        return redirect()->route('encounters');
    }

    public function save(Request $request, Encounter $encounter): RedirectResponse
    {
        /** @var User $user */
        if ($user = auth()->user()) {
            $user->encounters()->save($encounter);
            $request->session()->forget('encounter_id');
            return redirect()->route('encounter.owner', ['slug' => $encounter->slug]);
        }

        return redirect()->route('register');
    }

    public function clear(Encounter $encounter): EncounterResource
    {
        $encounter->is_active = false;
        $encounter->active_index = 0;
        $encounter->combatants()->delete();
        $encounter->save();

        return $this->returnResponse($encounter);
    }

    public function destroy(Encounter $encounter): JsonResponse
    {
        $this->authorize('update', $encounter);

        $encounter->delete();
        return response()->json(true);
    }

    public function add(Request $request, Encounter $encounter, $type)
    {
        return null;
    }

    /**
     * Update
     *
     * @param Request $request
     * @param Encounter $encounter
     * @return EncounterResource
     * @throws AuthorizationException
     */
    public function update(Request $request, Encounter $encounter): EncounterResource
    {
        $this->authorize('update', $encounter);

        $encounter->fill($request->except(['is_active']));

        // Update During Encounter
        if ($request->get('is_active') && $encounter->is_active) {
            foreach ($request->get('combatants') as $index => $requestCombatant) {
                $combatant = $encounter->combatants()->where('id', $requestCombatant['id'])->first();
                $combatant->order = $index;
                $combatant->save();
            }
        }

        // End Encounter
        if (!$request->get('is_active') && $encounter->is_active) {
            $encounter->is_active = false;
            $encounter->round = 1;
            $encounter->active_index = 0;
            $encounter->started_at = null;

            if (count($request->get('combatants')) === 0) {
                $encounter->combatants()->delete();
            }

            foreach ($encounter->combatants as $combatant) {
                $combatant->action = false;
                $combatant->bonus_action = false;
                $combatant->reaction = false;
                $combatant->death_save_success = 0;
                $combatant->death_save_failure = 0;
                $combatant->initiative = $combatant->statBlock->initiative ?? 0;
                $combatant->save();
            }
        }

        // Start Encounter
        if ($request->get('is_active') && !$encounter->is_active) {
            $encounter->is_active = true;
            $encounter->started_at = Carbon::now();

            foreach ($encounter->combatants->sortByDesc('initiative')->values() as $index => $combatant) {
                $combatant->order = $index;
                $combatant->save();
            }
        }
//        $encounter->is_active = $request->get('is_active');

//        $requestCombatants = $request->get('combatants');
//        $requestEncounter = $request->get('encounter');
//
//        if ($requestCombatants) {

//        }
//
//        if ($requestEncounter) {
//            if ($requestEncounter['is_active'] === false) {
//                $encounter->round = 1;
//                $encounter->active_index = 0;
//            } else {
//                $encounter->started_at = Carbon::now();
//                foreach ($encounter->combatants->sortByDesc('initiative')->values() as $index => $combatant) {
//                    $combatant->order = $index;
//                    $combatant->save();
//                }
//            }
//
//            if (isset($requestEncounter['combatants']) && count($requestEncounter['combatants']) === 0) {
//                $encounter->combatants()->delete();
//            }
//
//            $encounter->is_active = $requestEncounter['is_active'];
//        }

        $encounter->save();
        $encounter->fresh();

        return $this->returnResponse($encounter);
    }

    public function order(Request $request, Encounter $encounter): EncounterResource
    {
        foreach ($request->get('combatants') as $index => $requestCombatant) {
            $combatant = $encounter->combatants()->where('id', $requestCombatant['id'])->first();
            $combatant->order = $index;
            $combatant->save();
        }

        $encounter->combatants->fresh();
        $encounter->fresh();

        return $this->returnResponse($encounter);
    }

    public function encounters()
    {
        /** @var User $user */
        $user = auth()->user();
        $encounters = $user->encounters;

        return Inertia::render('Encounter/Encounters', [
            'encounters' => $encounters
        ]);
    }


    public function addByStatBlock(Encounter $encounter, StatBlock $statBlock): EncounterResource
    {
        $order = $encounter->combatants_count;

        $encounter->combatants()->create([
            'name'               => $statBlock->name,
            'type'               => $statBlock->stat_block_type,
            'current_hit_points' => $statBlock->hit_points,
            'hit_point_maximum'  => $statBlock->hit_points,
            'armor_class'        => $statBlock->armor_class,
            'initiative'         => $statBlock->getDexterityModifierAttribute(),
            'order'              => $order,
            'stat_block_id'      => $statBlock->id
        ]);

        return $this->returnResponse($encounter);
    }

    public function remove(Encounter $encounter, Combatant $combatant): EncounterResource
    {
        $combatant->delete();

        return $this->returnResponse($encounter);
    }

    private function returnResponse(Encounter $encounter): EncounterResource
    {
        UpdateEncounter::dispatch($encounter);
        return new EncounterResource($encounter->fresh());
    }

}
