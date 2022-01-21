<?php

namespace Database\Seeders;

use App\Models\Action;
use App\Models\StatBlock;
use App\Models\Spell;
use App\Models\Team;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use function file_get_contents;
use function json_decode;
use function resource_path;
use function trim;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        User::factory()->state([
            'name'     => 'Joshua Payne',
            'email'    => 'suxur@me.com',
            'password' => Hash::make('password'),
        ])->hasAttached(
            Team::factory()->state(function (array $attributes, User $user) {
                return [
                    'user_id'       => $user->id,
                    'name'          => 'The Pthumerians',
                    'personal_team' => true
                ];
            }),
            ['role' => 'dm']
        )->create();

        $path = resource_path('data/spells.json');
        $json = file_get_contents($path);
        $records = json_decode($json, true);

        $data = [];
        foreach ($records as $record) {
            $data[] = [
                'name'                   => $record['name'],
                'description'            => $record['desc'] ?? null,
                'higher_level'           => $record['higher_level'] ?? null,
                'page'                   => $record['page'] ?? null,
                'range'                  => $record['range'] ?? null,
                'components'             => $record['components'] ?? null,
                'material'               => $record['material'] ?? null,
                'duration'               => $record['duration'] ?? null,
                'casting_time'           => $record['casting_time'] ?? null,
                'level'                  => $record['level'] ?? null,
                'level_int'              => $record['level_int'] ?? 1,
                'school'                 => $record['school'] ?? null,
                'class'                  => $record['class'] ?? null,
                'archetype'              => $record['archetype'] ?? null,
                'circles'                => $record['circles'] ?? null,
                'domains'                => $record['domains'] ?? null,
                'oaths'                  => $record['oaths'] ?? null,
                'patrons'                => $record['patrons'] ?? null,
                'is_ritual'              => isset($record['ritual']) ? $record['ritual'] === 'yes' : null,
                'requires_concentration' => isset($record['concentration']) ? $record['concentration'] === 'yes' : null
            ];
        }

        Spell::insert($data);

        $path = resource_path('data/monsters.json');
        $json = file_get_contents($path);
        $records = json_decode($json, true);
        foreach ($records as $record) {
            $data = [
                'name'                   => $record['name'],
                'size'                   => $record['size'] ?? null,
                'stat_block_type'        => 'monster',
                'type'                   => $record['type'] ?? null,
                'subtype'                => $record['subtype'] ?? null,
                'alignment'              => $record['alignment'] ?? null,
                'armor_class'            => $record['armor_class'] ?? 0,
                'hit_points'             => $record['hit_points'] ?? 0,
                'hit_dice'               => $record['hit_dice'] ?? null,
                'speed'                  => $record['speed'] ?? null,
                'strength'               => $record['strength'] ?? 0,
                'dexterity'              => $record['dexterity'] ?? 0,
                'constitution'           => $record['constitution'] ?? 0,
                'intelligence'           => $record['intelligence'] ?? 0,
                'wisdom'                 => $record['wisdom'] ?? 0,
                'charisma'               => $record['charisma'] ?? 0,
                'constitution_save'      => $record['constitution_save'] ?? 0,
                'intelligence_save'      => $record['intelligence_save'] ?? 0,
                'wisdom_save'            => $record['wisdom_save'] ?? 0,
                'history'                => $record['history'] ?? 0,
                'perception'             => $record['perception'] ?? 0,
                'damage_vulnerabilities' => $record['damage_vulnerabilities'] ?? null,
                'damage_resistances'     => $record['damage_resistances'] ?? null,
                'damage_immunities'      => $record['damage_immunities'] ?? null,
                'condition_immunities'   => $record['condition_immunities'] ?? null,
                'senses'                 => $record['senses'] ?? null,
                'languages'              => $record['languages'] ?? null,
                'challenge_rating'       => $record['challenge_rating'] ?? null,
                'legendary_description'  => $record['legendary_desc'] ?? null,
                'speed_json'             => $record['speed_json'] ? json_encode($record['speed_json']) : null,
                'armor_description'      => $record['armor_desc'] ?? null,
                'collection'             => '5e SRD',
                'created_at'             => Carbon::now()
            ];

            $character = new StatBlock($data);
            $character->save();

            $actions = [];

            if (isset($record['actions'])) {
                foreach ($record['actions'] as $action) {
                    $actions[] =
                        new Action([
                            'name'         => $action['name'],
                            'description'  => $action['desc'] ?? null,
                            'attack_bonus' => $action['attack_bonus'] ?? 0,
                            'damage_dice'  => $action['damage_dice'] ?? null,
                            'damage_bonus' => $action['damage_bonus'] ?? 0,
                        ]);
                }
            }

            if (isset($record['reactions'])) {
                foreach ($record['reactions'] as $action) {
                    $actions[] =
                        new Action([
                            'name'         => $action['name'],
                            'description'  => $action['desc'] ?? null,
                            'attack_bonus' => $action['attack_bonus'] ?? 0,
                            'damage_dice'  => $action['damage_dice'] ?? null,
                            'damage_bonus' => $action['damage_bonus'] ?? 0,
                            'is_reaction'  => true
                        ]);
                }
            }

            if (isset($record['special_abilities'])) {
                foreach ($record['special_abilities'] as $action) {
                    $actions[] =
                        new Action([
                            'name'         => $action['name'],
                            'description'  => $action['desc'] ?? null,
                            'attack_bonus' => $action['attack_bonus'] ?? 0,
                            'damage_dice'  => $action['damage_dice'] ?? null,
                            'damage_bonus' => $action['damage_bonus'] ?? 0,
                            'is_special'   => true
                        ]);
                }
            }

            if (isset($record['legendary_actions'])) {
                foreach ($record['legendary_actions'] as $action) {
                    $actions[] =
                        new Action([
                            'name'         => $action['name'],
                            'description'  => $action['desc'] ?? null,
                            'attack_bonus' => $action['attack_bonus'] ?? 0,
                            'damage_dice'  => $action['damage_dice'] ?? null,
                            'damage_bonus' => $action['damage_bonus'] ?? 0,
                            'is_legendary' => true
                        ]);
                }
            }

            $character->actions()->saveMany($actions);

            if (isset($record['spells'])) {
                $characterSpells = [];
                foreach ($record['spells'] as $spell) {
                    if ($foundSpell = Spell::where(['name' => trim($spell)])->first()) {
                        $characterSpells[] = $foundSpell;
                    }
                }
                $characterSpellIds = collect($characterSpells)->pluck(['id']);
                $character->spells()->sync($characterSpellIds);
            }
        }
    }
}
