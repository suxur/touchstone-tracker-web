<?php

namespace Tests\Feature;

use App\Models\Action;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateStatBlockTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_create_a_basic_stat_block()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();

        $response = $this->post('/api/stat-blocks', $this->requiredFormData());

        $this->assertCount(1, $user->fresh()->statBlocks);
        $this->assertEquals('Skeleton', $user->fresh()->statBlocks()->latest('id')->first()->name);
    }

    /** @test */
    public function a_user_can_create_a_stat_block_with_actions()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();

        $response = $this->post('/api/stat-blocks', $this->formData());

        $this->assertCount(1, $user->fresh()->statBlocks);
        $this->assertEquals('Skeleton', $user->fresh()->statBlocks()->latest('id')->first()->name);
        $this->assertDatabaseCount('actions', 6);

        $trait = Action::where('name', 'Trait 1')->first();
        $this->assertFalse($trait->is_reaction);
        $this->assertFalse($trait->is_legendary);
        $this->assertTrue($trait->is_special);

        $action = Action::where('name', 'Action 1')->first();
        $this->assertFalse($action->is_reaction);
        $this->assertFalse($action->is_legendary);
        $this->assertFalse($action->is_special);

        $reaction = Action::where('name', 'Reaction 1')->first();
        $this->assertTrue($reaction->is_reaction);
        $this->assertFalse($reaction->is_legendary);
        $this->assertFalse($reaction->is_special);

        $legendaryAction = Action::where('description', 'My legendary action')->first();
        $this->assertFalse($legendaryAction->is_reaction);
        $this->assertTrue($legendaryAction->is_legendary);
        $this->assertFalse($legendaryAction->is_special);
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