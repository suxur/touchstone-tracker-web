<?php

namespace Tests\Feature;

use App\Models\StatBlock;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateStatBlockTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_update_a_stat_block()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();

        $statBlock = StatBlock::factory([
          'name' => 'Ghost',
          'user_id' => $user->id,
        ])->create();

        $this->put("/api/stat-blocks/{$statBlock->id}", $this->requiredFormData());

        $this->assertCount(1, $user->fresh()->statBlocks);
        $this->assertEquals('Skeleton', $user->fresh()->statBlocks()->latest('id')->first()->name);
    }

    /** @test */
    public function a_user_cannot_update_a_stat_block_they_do_not_own()
    {
        $this->signIn();

        $statBlock = StatBlock::factory([
          'name' => 'Ghost',
        ])->create();

        $response = $this->put("/api/stat-blocks/{$statBlock->id}", $this->requiredFormData());

        $response->assertForbidden();
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

    private function formData(): array
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
