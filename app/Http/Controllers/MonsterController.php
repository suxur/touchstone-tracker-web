<?php

namespace App\Http\Controllers;

use App\Actions\Jetstream\CreateStatBlock;
use App\Actions\Jetstream\RemoveMonster;
use App\Actions\Jetstream\UpdateMonster;
use App\Models\Action;
use App\Models\Monster;
use App\Models\StatBlock;
use App\Models\User;
use DB;
use Facades\App\Import\XML;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use function app;
use function back;

class MonsterController extends Controller
{
    public const SIZE = [
        'T' => 'tiny',
        'S' => 'small',
        'M' => 'medium',
        'L' => 'large',
        'H' => 'huge',
        'G' => 'gargantuan'
    ];

    /**
     * Show the general profile settings screen.
     *
     * @return Response
     */
    public function index(): Response
    {
        /** @var User $user */
        $user = auth()->user();

//        $collections = $user->monsters()->sortBy('name')->groupBy('collection');
//
//        return Inertia::render('Monsters/Index', [
//            'collections'      => $collections,
//            'collection_names' => $collections->keys()
//        ]);
        return Inertia::render('Monsters/Index', [
            'monsters'    => $user->monsters()->sortBy('name')->values(),
            'preloaded'   => StatBlock::where('user_id', null)->monsters()->paginate(10),
            'permissions' => [
                // TODO: Implement character permissions
                'canManageMonsters' => true,
            ],
        ]);
    }

    /**
     * Create a new monster.
     *
     * @param Request $request
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $creator = app(CreateStatBlock::class);

        $creator->create($request->user(), $request->all());

        return back(303);
    }

    /**
     * Update a monster.
     *
     * @param Request $request
     * @param Monster $monster
     * @return RedirectResponse
     * @throws ValidationException|AuthorizationException
     */
    public function update(Request $request, Monster $monster): RedirectResponse
    {
        $creator = app(UpdateMonster::class);

        $creator->update($request->user(), $monster, $request->all());

        return back(303);
    }

    /**
     * Remove the given monster.
     *
     * @param Request $request
     * @param Monster $monster
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function destroy(Request $request, Monster $monster): RedirectResponse
    {
        app(RemoveMonster::class)->remove($request->user(), $monster);

        return back(303);
    }

    public function monster(Monster $monster): JsonResponse
    {
        $monster->setAppends([
            'experience_points',
            'initiative',
            'strength_modifier',
            'dexterity_modifier',
            'constitution_modifier',
            'intelligence_modifier',
            'wisdom_modifier',
            'charisma_modifier',
        ]);

        return response()->json($monster);
    }

    public function import(Request $request)
    {
        $type = $request->get('type');
        $collection = $request->get('group');
        if ($path = optional($request->file('file'))->getRealPath()) {
            switch ($type) {
                case 'dndappfile':
                    $this->importXml($path, $collection);
                    break;
                case 'json':
                    break;
            }
        }

        return $request->wantsJson() ? new JsonResponse('', 200) : back()->with('status', 'monster-import-success');
    }

    private function importXml($path, $collection = null)
    {
        $xmlDataString = file_get_contents($path);
        $xmlObject = simplexml_load_string($xmlDataString);

        $json = json_encode($xmlObject);
        $data = json_decode($json, true);

        $data['monster'] = collect($data['monster'])->map(function ($monster) {
            foreach ($monster as $key => $value) {
                if (empty($value)) {
                    $monster[$key] = null;
                }
            }

            return $monster;
        });

        DB::transaction(function () use ($data, $collection) {
            foreach ($data['monster'] as $monster) {
                $newMonster = Monster::create([
                    'user_id'                => auth()->id(),
                    'name'                   => $monster['name'],
                    'size'                   => self::SIZE[$monster['size']],
                    'type'                   => XML::getType($monster['type']),
                    'subtype'                => XML::getSubType($monster['type']),
                    'alignment'              => $monster['alignment'],
                    'armor_class'            => XML::getArmorClass($monster['ac']),
                    'hit_points'             => XML::getHitPoints($monster['hp']),
                    'hit_dice'               => XML::getHitDice($monster['hp']),
                    'speed'                  => $monster['speed'],
                    'strength'               => $monster['str'],
                    'dexterity'              => $monster['dex'],
                    'constitution'           => $monster['con'],
                    'intelligence'           => $monster['int'],
                    'wisdom'                 => $monster['wis'],
                    'charisma'               => $monster['cha'],
                    'strength_save'          => XML::getSavingThrow($monster['save'], 'str'),
                    'dexterity_save'         => XML::getSavingThrow($monster['save'], 'dex'),
                    'constitution_save'      => XML::getSavingThrow($monster['save'], 'con'),
                    'intelligence_save'      => XML::getSavingThrow($monster['save'], 'int'),
                    'wisdom_save'            => XML::getSavingThrow($monster['save'], 'wis'),
                    'charisma_save'          => XML::getSavingThrow($monster['save'], 'cha'),
                    'acrobatics'             => XML::getSkill($monster['skill'], 'acrobatics'),
                    'animal_handling'        => XML::getSkill($monster['skill'], 'animal_handling'),
                    'arcana'                 => XML::getSkill($monster['skill'], 'arcana'),
                    'athletics'              => XML::getSkill($monster['skill'], 'athletics'),
                    'deception'              => XML::getSkill($monster['skill'], 'deception'),
                    'history'                => XML::getSkill($monster['skill'], 'history'),
                    'insight'                => XML::getSkill($monster['skill'], 'insight'),
                    'intimidation'           => XML::getSkill($monster['skill'], 'intimidation'),
                    'investigation'          => XML::getSkill($monster['skill'], 'investigation'),
                    'medicine'               => XML::getSkill($monster['skill'], 'medicine'),
                    'nature'                 => XML::getSkill($monster['skill'], 'nature'),
                    'perception'             => XML::getSkill($monster['skill'], 'perception'),
                    'performance'            => XML::getSkill($monster['skill'], 'performance'),
                    'persuasion'             => XML::getSkill($monster['skill'], 'persuasion'),
                    'religion'               => XML::getSkill($monster['skill'], 'religion'),
                    'sleight_of_hand'        => XML::getSkill($monster['skill'], 'sleight_of_hand'),
                    'stealth'                => XML::getSkill($monster['skill'], 'stealth'),
                    'survival'               => XML::getSkill($monster['skill'], 'survival'),
                    'damage_vulnerabilities' => $monster['vulnerable'],
                    'damage_resistances'     => $monster['resist'],
                    'damage_immunities'      => $monster['immune'],
                    'condition_immunities'   => $monster['conditionImmune'],
                    'senses'                 => $monster['senses'],
                    'languages'              => $monster['languages'],
                    'challenge_rating'       => $monster['cr'],
                    'legendary_description'  => null,
                    'speed_json'             => null,
                    'armor_description'      => XML::getArmorDescription($monster['ac']),
                    'collection'             => $collection ?? 'Uncategorized'
                ]);

                if (isset($monster['action'])) {
                    $this->importXMLActions($newMonster->id, $monster['action']);
                }

                if (isset($monster['reaction'])) {
                    $this->importXMLActions($newMonster->id, $monster['reaction'], 'reaction');
                }

                if (isset($monster['trait'])) {
                    $this->importXMLActions($newMonster->id, $monster['trait'], 'special');
                }

                if (isset($monster['legendary'])) {
                    $this->importXMLActions($newMonster->id, $monster['legendary'], 'legendary');
                }
            }
        });
    }

    private function importXMLActions(int $id, array $actions, ?string $type = null)
    {
        $data = [];

        $actions = isset($actions[0]) ? $actions : [$actions];

        foreach ($actions as $action) {
            $data[] = [
                'combatant_id'   => $id,
                'combatant_type' => 'monster',
                'name'           => is_array($action['name']) ? null : $action['name'],
                'description'    => is_array($action['text']) ? implode("\n\n", array_filter($action['text'])) : $action['text'],
                'attack_bonus'   => isset($action['attack']) ? XML::getAttackBonus($action['attack']) : 0,
                'damage_dice'    => isset($action['attack']) ? XML::getDamageDice($action['attack']) : null,
                'damage_bonus'   => null,
                'is_reaction'    => $type === 'reaction',
                'is_special'     => $type === 'special',
                'is_legendary'   => $type === 'legendary',
            ];
        }

        Action::insert($data);
    }

}
