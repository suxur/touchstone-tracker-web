<?php

namespace App\Http\Controllers;

use App\Encounters\Encounters;
use App\Events\UpdateEncounter;
use App\Http\Resources\EncounterResource;
use App\Models\Combatant;
use App\Models\StatBlock;
use App\Models\Encounter;
use App\Models\Spell;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use function auth;
use function redirect;
use function session;

class EncounterController extends Controller
{
    public function index()
    {
        $slug = session('encounter_slug');

        if (!$slug) {
            $slug = Str::random(8);
            session(['encounter_slug' => $slug]);
        }

        $encounter = Encounter::firstOrCreate([
            'slug' => $slug,
        ]);

        session(['encounter_slug' => $encounter->slug]);

        if (auth()->check()) {
            return redirect()->route('encounter.owner', ['slug' => $slug]);
        }

        return Inertia::render('Encounter', ['encounter' => new EncounterResource($encounter)]);
    }

    /**
     * @throws ValidationException
     */
    public function lookup(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'lookup' => 'required|string',
        ], [
            'lookup.required' => 'Please enter an Encounter ID or URL.'
        ]);

        $validator->after(function ($validator) use ($request) {
            if ($lookup = $request->get('lookup')) {
                $slug = Encounters::lookup($lookup);
                if (!Encounter::whereSlug($slug)->first()) {
                    $validator->errors()->add(
                        'lookup', 'Unable to find encounter',
                    );
                }
            }
        })->validate();

        return redirect()->route('player.show', ['slug' => $request->get('lookup')]);
    }

    /**
     * Owner
     *
     * @param $slug
     */
    public function owner($slug)
    {
        $encounter = Encounter::whereSlug($slug)->firstOrFail();

        $this->authorize('update', $encounter);

        /** @var User $user */
        $user = auth()->user();

        if ($encounter->user_id === null) {
            $encounter->user_id = auth()->id();
            session()->remove('encounter_slug');
            $encounter->save();
        }

        session(['encounter_slug' => $encounter->slug]);

//        $characters = $user->characters;
//        $teamCharacters = $user->currentTeam->characters;
//        $characters = $characters->merge($teamCharacters);
//        $encounters = $user->encounters()->get(['id', 'slug', 'created_at'])->each->setAppends(['created_at_diff']);

//        $collections = $user->monsters->each->setAppends([
//            'initiative',
//            'speed_array',
//            'senses_array',
//            'damage_vulnerabilities_array',
//            'damage_resistances_array',
//            'damage_immunities_array',
//            'condition_immunities_array',
//            'languages_array',
//            'skills_array',
//            'saves_array'
//        ])->sortBy('name')->groupBy('collection');

        return Inertia::render('Encounter', [
            'encounter' => $encounter,
//            'monsters'         => Monster::select(['id', 'name', 'hit_points', 'dexterity'])->without('specialAbilities', 'actions', 'reactions', 'legendaryActions')->get(),
//            'characters'       => $characters,
//            'combatants'       => $encounter->combatants,
//            'encounters'       => $encounters,
//            'collection_names' => $collections->keys()
        ]);
    }

    public function clear(Encounter $encounter): RedirectResponse
    {
        $encounter->is_active = false;
        $encounter->active_index = 0;
        $encounter->combatants()->delete();
        $encounter->save();

        UpdateEncounter::dispatch($encounter);
        return back();
    }

    public function destroy(Encounter $encounter): RedirectResponse
    {
        $this->authorize('update', $encounter);

        $encounter->delete();
        return back();
    }

    public function createMonster(Request $request, Encounter $encounter): RedirectResponse
    {
        $encounter->combatants()->create($request->all());
//        $encounter->addMonsterCombatant($combatant);

        UpdateEncounter::dispatch($encounter);
        return back();
    }

    public function addMonster(Encounter $encounter, StatBlock $character): RedirectResponse
    {
        $encounter->addMonsterCombatant($character);

        UpdateEncounter::dispatch($encounter);
        return back();
    }

    /**
     * Add Combatant
     *
     * @param Request $request
     * @param Encounter $encounter
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function add(Request $request, Encounter $encounter): RedirectResponse
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
        return back();
    }

    /**
     * Add Combatant
     *
     * @param Request $request
     * @param Encounter $encounter
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function addCombatants(Request $request, Encounter $encounter): RedirectResponse
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
        return back();
    }


    public function addByStatBlock(Encounter $encounter, StatBlock $statBlock)
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

        UpdateEncounter::dispatch($encounter);
        return back();
    }

    /**
     * Update
     *
     * @param Request $request
     * @param Encounter $encounter
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function update(Request $request, Encounter $encounter): RedirectResponse
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
        UpdateEncounter::dispatch($encounter);

        return back(303);
    }

    public function remove(Request $request, Encounter $encounter, Combatant $combatant)
    {
        $combatant->delete();

        UpdateEncounter::dispatch($encounter);
        return back();
    }

    public function encounters(): Response
    {
        return Inertia::render('Encounters/Show');
    }

    public function create(): RedirectResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $slug = Str::random(8);

        $user->encounters()->create([
            'slug' => $slug,
        ]);

        return redirect()->route('encounter.owner', ['slug' => $slug]);
    }
}
