<?php

namespace App\Http\Controllers\Api;

use App\Encounters\Encounters;
use App\Events\UpdateEncounter;
use App\Http\Controllers\Controller;
use App\Models\Character;
use App\Models\Encounter;
use App\Models\Monster;
use App\Models\Spell;
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


    public function lookup(Request $request): RedirectResponse
    {
        Validator::make($request->all(), [
            'lookup' => 'required|string',
        ], [
            'lookup.required' => 'Please enter an Encounter ID or URL.',
        ])->validate();

        if ($lookup = $request->get('lookup')) {
            $slug = Encounters::lookup($lookup);
            return redirect()->route('encounter.player', ['slug' => $slug]);
        }

        // Show errors...
        return back();
    }

    /**
     * Owner
     *
     * @param $slug
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function owner($slug): JsonResponse
    {
        $encounter = Encounter::whereSlug($slug)->firstOrFail();

        return response()->json($encounter);

        $this->authorize('update', $encounter);

        /** @var User $user */
        $user = auth()->user();

        if ($encounter->user_id === null) {
            $encounter->user_id = auth()->id();
            session()->remove('encounter_slug');
            $encounter->save();
        }

        session(['encounter_slug' => $encounter->slug]);
        return response()->json($encounter);

//        $characters = $user->characters;
//        $teamCharacters = $user->currentTeam->characters;
//        $characters = $characters->merge($teamCharacters);
//        $encounters = $user->encounters()->get(['id', 'slug', 'created_at'])->each->setAppends(['created_at_diff']);
//
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
//
//        return Inertia::render('Encounter/Index', [
//            'encounter'  => $encounter,
//            'monsters'   => Monster::select(['id', 'name', 'hit_points', 'dexterity'])->without('specialAbilities', 'actions', 'reactions', 'legendaryActions')->get(),
//            'characters' => $characters,
//            'combatants' => $encounter->combatants,
//            'spells'     => Spell::all('id', 'name'),
//            'encounters' => $encounters,
//            'collection_names' => $collections->keys()
//        ]);
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
            'init' => $encounter,
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

    public function clear(Encounter $encounter): RedirectResponse
    {
        $encounter->is_active = false;
        $encounter->active_index = 0;
        $encounter->monsters()->detach();
        $encounter->characters()->detach();
        $encounter->save();

        UpdateEncounter::dispatch($encounter);
        return back();
    }

    public function destroy(Encounter $encounter): JsonResponse
    {
        $this->authorize('update', $encounter);

        $encounter->delete();
        return response()->json(true);
    }

    public function add(Request $request, Encounter $encounter, $type): JsonResponse
    {
        $ids = collect($request->get('ids'));

        /** @var User $user */
        $user = auth()->user();

        if ($type === Encounter::COMBATANT_MONSTER) {
            $monsters = Monster::find($ids);
            foreach ($monsters as $monster) {
                $encounter->addMonsterCombatant($monster);
            }
//            } else {
//                $monsterData = [
//                    'name' => $combatant['name'],
//                    'collection' => 'Uncategorized',
//                ];
//
//                if ($user) {
//                    $monsterData['user_id'] = $user->id;
//                }
//
//                $monster = Monster::create($monsterData);
//            }
        }

        if ($type === Encounter::COMBATANT_CHARACTER) {
            $characters = Character::find($ids);
//            } else {
//                $characterData = [
//                    'name' => $combatant['name']
//                ];
//
//                if ($user && $user->currentTeam) {
//                    $characterData['team_id'] = $user->currentTeam->id;
//                }
//
//                $character = Character::create($characterData);
//            }

            foreach ($characters as $character) {
                $encounter->addCharacterCombatant($character);
            }

            if (!auth()->check()) {
                $characterIds = session('character_ids', []);
                $characterIds[] = $character->id;
                session(['character_ids' => $characterIds]);
            }
        }

        UpdateEncounter::dispatch($encounter);
        return response()->json($encounter);
    }

    public function update(Request $request, Encounter $encounter): RedirectResponse
    {
        $this->authorize('update', $encounter);

        $requestCombatants = $request->get('combatants');
        $requestEncounter = $request->get('encounter');

        if ($requestCombatants) {
            foreach ($requestCombatants as $index => $combatant) {
                $updateData = [
                    'hit_points' => $combatant['encounter_stats']['hit_points'],
                    'initiative' => $combatant['encounter_stats']['initiative'],
                    'action' => $combatant['encounter_stats']['action'],
                    'bonus_action' => $combatant['encounter_stats']['bonus_action'],
                    'reaction' => $combatant['encounter_stats']['reaction'],
                    'extra_action' => $combatant['encounter_stats']['extra_action'],
                    'death_save_success' => $combatant['encounter_stats']['death_save_success'],
                    'death_save_failure' => $combatant['encounter_stats']['death_save_failure'],
                    'order' => $index
                ];

                if ($combatant['encounter_stats']['combatant_type'] === Encounter::COMBATANT_MONSTER) {
                    Monster::where('id', $combatant['id'])->update(['hit_points' => $combatant['hit_points'], 'armor_class' => $combatant['armor_class']]);
                    $encounter->monsters()->wherePivot('unique_id', $combatant['encounter_stats']['unique_id'])->updateExistingPivot($combatant['id'], $updateData);
                }

                if ($combatant['encounter_stats']['combatant_type'] === Encounter::COMBATANT_CHARACTER) {
                    Character::where('id', $combatant['id'])->update(['hit_points' => $combatant['hit_points'], 'armor_class' => $combatant['armor_class']]);
                    $characters[$combatant['id']] = $updateData;
                }
            }

            if (isset($characters)) {
                $encounter->characters()->syncWithoutDetaching($characters);
            }
        }

        if ($request->has('monster_hp_status')) {
            $encounter->monster_hp_status = $request->get('monster_hp_status');
        }

        if ($request->has('character_hp_status')) {
            $encounter->character_hp_status = $request->get('character_hp_status');
        }

        if ($requestEncounter) {
            if ($requestEncounter['is_active']) {
                $encounter->started_at = Carbon::now();
            }

            $encounter->is_active = $requestEncounter['is_active'];
            $encounter->active_index = $requestEncounter['active_index'];
            $encounter->round = $requestEncounter['round'];
        }

        $encounter->save();
        UpdateEncounter::dispatch($encounter);
        return back();
    }

    public function remove(Request $request, Encounter $encounter): JsonResponse
    {
        $combatant = $request->get('combatant');
        $combatantType = $combatant['encounter_stats']['combatant_type'];

        if ($combatantType === Encounter::COMBATANT_MONSTER) {
            $encounter
                ->monsters()
                ->wherePivot('unique_id', $combatant['encounter_stats']['unique_id'])
                ->detach($combatant['encounter_stats']['combatant_id']);
        } else {
            $encounter->characters()->detach($combatant['id']);
        }

        $encounter->save();
        UpdateEncounter::dispatch($encounter);
        return response()->json(true);
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
}
