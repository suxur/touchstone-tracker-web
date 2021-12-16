<?php

namespace App\Http\Controllers;

use App\Encounters\Encounters;
use App\Events\UpdateEncounter;
use App\Models\Character;
use App\Models\Encounter;
use App\Models\Monster;
use App\Models\Spell;
use App\Models\User;
use Carbon\Carbon;
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

    $encounters = [];

    $monsters = Monster::select(['id', 'name', 'hit_points', 'dexterity'])->without('specialAbilities', 'actions', 'reactions', 'legendaryActions')->get();

    /** @var User $user */
    if (auth()->check() && $user = auth()->user()) {
      $characters = $user->characters;
      $teamCharacters = $user->currentTeam->characters;
      $characters = $characters->merge($teamCharacters);
      $encounters = $user->encounters()->select('id', 'slug')->without('characters', 'monsters')->get();
      $monsters = $monsters->merge($user->monsters);
    } else {
      $characterIds = session('character_ids', []);
      $characters = Character::findMany($characterIds);
    }

    return Inertia::render('Encounter', [
      'encounter'  => $encounter,
      'monsters'   => $monsters,
      'characters' => $characters,
      'combatants' => $encounter->combatants,
      'spells'     => Spell::all('id', 'name'),
      'encounters' => $encounters,
    ]);
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

    return redirect()->route('encounter.player', ['slug' => $request->get('lookup')]);
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

    $characters = $user->characters;
    $teamCharacters = $user->currentTeam->characters;
    $characters = $characters->merge($teamCharacters);
    $encounters = $user->encounters()->get(['id', 'slug', 'created_at'])->each->setAppends(['created_at_diff']);

    $collections = $user->monsters->each->setAppends([
      'initiative',
      'speed_array',
      'senses_array',
      'damage_vulnerabilities_array',
      'damage_resistances_array',
      'damage_immunities_array',
      'condition_immunities_array',
      'languages_array',
      'skills_array',
      'saves_array'
    ])->sortBy('name')->groupBy('collection');

    return Inertia::render('Encounter', [
      'encounter'        => $encounter,
      'monsters'         => Monster::select(['id', 'name', 'hit_points', 'dexterity'])->without('specialAbilities', 'actions', 'reactions', 'legendaryActions')->get(),
      'characters'       => $characters,
      'combatants'       => $encounter->combatants,
      'spells'           => Spell::all('id', 'name'),
      'encounters'       => $encounters,
      'collection_names' => $collections->keys()
    ]);
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

  public function add(Request $request, Encounter $encounter, $type): RedirectResponse
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
    return back();
  }

//    public function add(Request $request, Encounter $encounter, $type): RedirectResponse
//    {
//        $combatants = collect($request->get('combatants'));
//        $order = $encounter->combatants_count;
//
//        /** @var User $user */
//        $user = auth()->user();
//
//        foreach ($combatants as $combatant) {
//            if ($type === Encounter::COMBATANT_MONSTER) {
//                if ($combatant['id']) {
//                    $monster = Monster::find($combatant['id']);
//                } else {
//                    $monsterData = [
//                        'name'       => $combatant['name'],
//                        'collection' => 'Uncategorized',
//                    ];
//
//                    if ($user) {
//                        $monsterData['user_id'] = $user->id;
//                    }
//
//                    $monster = Monster::create($monsterData);
//                }
//                $uniqueId = Str::random(8);
//                $updateData = [
//                    'unique_name' => $monster->name,
//                    'unique_id'   => $uniqueId,
//                    'hit_points'  => $combatant['encounter_stats']['hit_points'],
//                    'initiative'  => $combatant['encounter_stats']['initiative'],
//                    'order'       => $order,
//                ];
//
//                if (($count = $encounter->monsters()->where('id', $combatant['id'])->count()) > 0) {
//                    $updateData['unique_name'] = $monster->name . ' ' . $count;
//                }
//
//                $encounter->monsters()->attach([
//                    $monster->id => $updateData
//                ]);
//            } else if ($type === Encounter::COMBATANT_CHARACTER) {
//                if ($combatant['id']) {
//                    $character = Character::find($combatant['id']);
//                } else {
//                    $characterData = [
//                        'name' => $combatant['name']
//                    ];
//
//                    if ($user && $user->currentTeam) {
//                        $characterData['team_id'] = $user->currentTeam->id;
//                    }
//
//                    $character = Character::create($characterData);
//                }
//
//                $uniqueId = Str::random(8);
//                $encounter->characters()->attach([
//                    $character->id => [
//                        'unique_name' => $character->name,
//                        'unique_id'   => $uniqueId,
//                        'hit_points'  => $character->hit_points ?? 0,
//                        'initiative'  => $character->dexterity ?? 0,
//                        'order'       => $order,
//                    ]
//                ]);
//
//                if (!auth()->check()) {
//                    $characterIds = session('character_ids', []);
//                    $characterIds[] = $character->id;
//                    session(['character_ids' => $characterIds]);
//                }
//            }
//        }
//
//        UpdateEncounter::dispatch($encounter);
//        return back();
//    }

  public function update(Request $request, Encounter $encounter): RedirectResponse
  {
    $this->authorize('update', $encounter);

    $requestCombatants = $request->get('combatants');
    $requestEncounter = $request->get('encounter');

    if ($requestCombatants) {
      foreach ($requestCombatants as $index => $combatant) {
        $updateData = [
          'hit_points'         => $combatant['encounter_stats']['hit_points'],
          'initiative'         => $combatant['encounter_stats']['initiative'],
          'action'             => $combatant['encounter_stats']['action'],
          'bonus_action'       => $combatant['encounter_stats']['bonus_action'],
          'reaction'           => $combatant['encounter_stats']['reaction'],
          'extra_action'       => $combatant['encounter_stats']['extra_action'],
          'death_save_success' => $combatant['encounter_stats']['death_save_success'],
          'death_save_failure' => $combatant['encounter_stats']['death_save_failure'],
          'order'              => $index
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

  public function remove(Request $request, Encounter $encounter)
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
    return response()->json($encounter);
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
