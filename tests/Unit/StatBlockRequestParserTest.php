<?php

namespace Tests\Unit;

use App\Contracts\StatBlockRequestParser;
use App\Form\FormOption;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StatBlockRequestParserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_parses_the_data()
    {
        $this->signIn();

        $parser = new StatBlockRequestParser();

        $results = $parser->parse($this->requiredFormData());
        $this->assertSame($this->requiredExpected(), $results);

        $results = $parser->parse($this->fullFormData());
        $this->assertSame($this->fullFormExpected(), $results);
    }

    /** @test */
    public function it_parses_form_options()
    {
        $formOption = new FormOption('strength', 'string|default:10:int');
        $expected = [
            'type'    => 'string',
            'key'     => 'strength',
            'default' => 10,
            'field'   => null
        ];

        $this->assertSame($expected, $formOption->toArray());
    }

    private function requiredExpected(): array
    {
        return [
            'user_id'                => 1,
            'name'                   => 'Skeleton',
            'size'                   => null,
            'stat_block_type'        => 'monster',
            'type'                   => 'Undead',
            'subtype'                => 'Test',
            'alignment'              => null,
            'armor_class'            => 12,
            'hit_points'             => 12,
            'hit_dice'               => null,
            'armor_description'      => null,
            'speed'                  => null,
            'strength'               => 10,
            'dexterity'              => 10,
            'constitution'           => 10,
            'intelligence'           => 10,
            'wisdom'                 => 10,
            'charisma'               => 10,
            'strength_save'          => null,
            'dexterity_save'         => null,
            'constitution_save'      => null,
            'intelligence_save'      => null,
            'wisdom_save'            => null,
            'charisma_save'          => null,
            'acrobatics'             => null,
            'animal_handling'        => null,
            'arcana'                 => null,
            'athletics'              => null,
            'deception'              => null,
            'history'                => null,
            'insight'                => null,
            'intimidation'           => null,
            'investigation'          => null,
            'medicine'               => null,
            'nature'                 => null,
            'perception'             => null,
            'performance'            => null,
            'persuasion'             => null,
            'religion'               => null,
            'sleight_of_hand'        => null,
            'stealth'                => null,
            'survival'               => null,
            'damage_vulnerabilities' => null,
            'damage_resistances'     => null,
            'damage_immunities'      => null,
            'condition_immunities'   => null,
            'senses'                 => null,
            'languages'              => null,
            'traits'                 => [],
            'actions'                => [],
            'reactions'              => [],
            'legendary_actions'      => [],
            'legendary_description'  => null,
            'challenge_rating'       => null,
            'collection'             => null,
        ];
    }

    private function requiredFormData(): array
    {
        return [
            'name'            => 'Skeleton',
            'type'            => 'Undead',
            'subtype'         => 'Test',
            'armor_class'     => 12,
            'stat_block_type' => 'monster',
            'hit_points'      => 12,
        ];
    }

    private function fullFormExpected(): array
    {
        return [
            'user_id'                => 1,
            'name'                   => 'Skeleton',
            'size'                   => null,
            'stat_block_type'        => 'monster',
            'type'                   => 'Undead',
            'subtype'                => 'Test',
            'alignment'              => null,
            'armor_class'            => 12,
            'hit_points'             => 12,
            'hit_dice'               => null,
            'armor_description'      => null,
            'speed'                  => null,
            'strength'               => 10,
            'dexterity'              => 10,
            'constitution'           => 10,
            'intelligence'           => 10,
            'wisdom'                 => 10,
            'charisma'               => 10,
            'strength_save'          => 12,
            'dexterity_save'         => 12,
            'constitution_save'      => null,
            'intelligence_save'      => null,
            'wisdom_save'            => null,
            'charisma_save'          => null,
            'acrobatics'             => 12,
            'animal_handling'        => 12,
            'arcana'                 => null,
            'athletics'              => null,
            'deception'              => null,
            'history'                => null,
            'insight'                => null,
            'intimidation'           => null,
            'investigation'          => null,
            'medicine'               => null,
            'nature'                 => null,
            'perception'             => null,
            'performance'            => null,
            'persuasion'             => null,
            'religion'               => null,
            'sleight_of_hand'        => null,
            'stealth'                => null,
            'survival'               => null,
            'damage_vulnerabilities' => 'Test, Speed',
            'damage_resistances'     => null,
            'damage_immunities'      => null,
            'condition_immunities'   => null,
            'senses'                 => null,
            'languages'              => null,
            'traits'                 => [
                [
                    'name'         => 'Trait 1',
                    'description'  => 'My description',
                    'sort'         => 0,
                    'is_reaction'  => false,
                    'is_special'   => true,
                    'is_legendary' => false,
                ]
            ],
            'actions'                => [
                [
                    'name'         => 'Action 1',
                    'description'  => 'My action',
                    'sort'         => 0,
                    'is_reaction'  => false,
                    'is_special'   => false,
                    'is_legendary' => false,
                ],
                [
                    'name'         => 'Action 2',
                    'description'  => 'My other action',
                    'sort'         => 1,
                    'is_reaction'  => false,
                    'is_special'   => false,
                    'is_legendary' => false,
                ]
            ],
            'reactions'              => [
                [
                    'name'         => 'Reaction 1',
                    'description'  => 'My reaction',
                    'sort'         => 0,
                    'is_reaction'  => true,
                    'is_special'   => false,
                    'is_legendary' => false,
                ],
                [
                    'name'         => 'Reaction 2',
                    'description'  => 'My other reaction',
                    'sort'         => 1,
                    'is_reaction'  => true,
                    'is_special'   => false,
                    'is_legendary' => false,
                ]
            ],
            'legendary_actions'      => [
                [
                    'name'         => '',
                    'description'  => 'My legendary action',
                    'sort'         => 0,
                    'is_reaction'  => false,
                    'is_special'   => false,
                    'is_legendary' => true,
                ]
            ],
            'legendary_description'  => null,
            'challenge_rating'       => null,
            'collection'             => null,
        ];
    }

    private function fullFormData(): array
    {
        return [
            'name'                   => 'Skeleton',
            'type'                   => 'Undead',
            'subtype'                => 'Test',
            'armor_class'            => 12,
            'armor_description'      => null,
            'stat_block_type'        => 'monster',
            'hit_points'             => 12,
            'hit_dice'               => null,
            'cr'                     => null,
            'strength'               => 10,
            'dexterity'              => 10,
            'constitution'           => 10,
            'intelligence'           => 10,
            'wisdom'                 => 10,
            'charisma'               => 10,
            'size'                   => null,
            'alignment'              => null,
            'speed'                  => [],
            'senses'                 => [],
            'damage_vulnerabilities' => [
                [
                    'key'   => '918daf15ca7558',
                    'value' => 'Test',
                ],
                [
                    'key'   => '9f5e9b9bd046d8',
                    'value' => 'Speed',
                ],
            ],
            'damage_resistances'     => [],
            'damage_immunities'      => [],
            'condition_immunities'   => [],
            'languages'              => [],
            'saves'                  => [
                [
                    'key'   => '8125d57ce8443',
                    'name'  => 'strength',
                    'value' => 12,
                ],
                [
                    'key'   => '145cf128c9fde',
                    'name'  => 'dexterity',
                    'value' => 12,
                ],
            ],
            'skills'                 => [
                [
                    'key'   => '4e5a2185e0cf78',
                    'name'  => 'acrobatics',
                    'value' => 12,
                ],
                [
                    'key'   => '45bc54e074eb88',
                    'name'  => 'animal_handling',
                    'value' => 12,
                ],
            ],
            'traits'                 => [
                [
                    'key'         => '9c1e9ca678283',
                    'name'        => 'Trait 1',
                    'description' => 'My description',
                ]
            ],
            'actions'                => [
                [
                    'key'         => '4d38e13ef1a86',
                    'name'        => 'Action 1',
                    'description' => 'My action',
                ],
                [
                    'key'         => 'e3d6abae82a96',
                    'name'        => 'Action 2',
                    'description' => 'My other action',
                ]
            ],
            'reactions'              => [
                [
                    'key'         => '4d38e13ef1a86',
                    'name'        => 'Reaction 1',
                    'description' => 'My reaction',
                ],
                [
                    'key'         => 'e3d6abae82a96',
                    'name'        => 'Reaction 2',
                    'description' => 'My other reaction',
                ]
            ],
            'legendary_actions'      => [
                [
                    'key'         => 'e3d6abae82a96',
                    'name'        => '',
                    'description' => 'My legendary action',
                ],
            ],
            'legendary_description'  => null,
            'collection'             => null,
        ];
    }
}
