<?php

namespace Tests\Unit\Models;

use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class StatBlockTest extends ModelTestCase
{
    protected ?string $table = 'stat_blocks';
    protected array $columns = [
        'id',
        'user_id',
        'team_id',
        'session_id',
        'name',
        'size',
        'stat_block_type',
        'type',
        'subtype',
        'alignment',
        'armor_class',
        'hit_points',
        'hit_dice',
        'speed',
        'strength',
        'dexterity',
        'constitution',
        'intelligence',
        'wisdom',
        'charisma',
        'strength_save',
        'dexterity_save',
        'constitution_save',
        'intelligence_save',
        'wisdom_save',
        'charisma_save',
        'acrobatics',
        'animal_handling',
        'arcana',
        'athletics',
        'deception',
        'history',
        'insight',
        'intimidation',
        'investigation',
        'medicine',
        'nature',
        'perception',
        'performance',
        'persuasion',
        'religion',
        'sleight_of_hand',
        'stealth',
        'survival',
        'damage_vulnerabilities',
        'damage_resistances',
        'damage_immunities',
        'condition_immunities',
        'senses',
        'languages',
        'challenge_rating',
        'legendary_description',
        'speed_json',
        'armor_description',
        'collection',
        'created_at',
        'updated_at'
    ];

    public $statBlock;


    /** @test */
    public function a_stat_block_can_belong_to_a_team(): void
    {
        $statBlock = StatBlock::factory()->make();
        $this->assertInstanceOf(BelongsTo::class, $statBlock->team());
    }

    /** @test */
    public function a_stat_block_has_one_combatant(): void
    {
        $statBlock = StatBlock::factory()->make();
        $this->assertInstanceOf(HasOne::class, $statBlock->combatant());
    }

    /** @test */
    public function a_stat_block_has_many_special_abilities(): void
    {
        $statBlock = StatBlock::factory()->make();
        $this->assertInstanceOf(HasMany::class, $statBlock->specialAbilities());
    }

    /** @test */
    public function a_stat_block_has_many_actions(): void
    {
        $statBlock = StatBlock::factory()->make();
        $this->assertInstanceOf(HasMany::class, $statBlock->actions());
    }

    /** @test */
    public function a_stat_block_has_many_reactions(): void
    {
        $statBlock = StatBlock::factory()->make();
        $this->assertInstanceOf(HasMany::class, $statBlock->reactions());
    }

    /** @test */
    public function a_stat_block_has_many_legendary_actions(): void
    {
        $statBlock = StatBlock::factory()->make();
        $this->assertInstanceOf(HasMany::class, $statBlock->legendaryActions());
    }

    /** @test */
    public function a_stat_block_belongs_to_many_spells(): void
    {
        $statBlock = StatBlock::factory()->make();
        $this->assertInstanceOf(BelongsToMany::class, $statBlock->spells());
    }

    /** @test */
    public function a_stat_block_scopes_preloaded_monsters(): void
    {
        $user = User::factory()->create();

        StatBlock::factory()->count(2)->create([
            'stat_block_type' => 'monster',
            'user_id'         => null,
            'team_id'         => null,
            'session_id'      => null,
            'name'            => 'Skeleton',
            'collection'      => '5e',
        ]);

        StatBlock::factory()->count(3)->create([
            'stat_block_type' => 'monster',
            'user_id'         => $user->id,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        $this->assertCount(2, StatBlock::preloadedMonsters()->get());
    }

    /** @test */
    public function a_stat_block_scopes_monsters(): void
    {
        $user = User::factory()->create();

        StatBlock::factory()->count(2)->create([
            'stat_block_type' => 'monster',
            'user_id'         => null,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        StatBlock::factory()->count(3)->create([
            'stat_block_type' => 'monster',
            'user_id'         => $user->id,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        $this->assertCount(2, StatBlock::monsters()->get());
    }

    /** @test */
    public function a_stat_block_scopes_authenticated_user_monsters(): void
    {
        $user = $this->signIn();

        StatBlock::factory()->count(2)->create([
            'stat_block_type' => 'monster',
            'user_id'         => null,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        StatBlock::factory()->count(3)->create([
            'stat_block_type' => 'monster',
            'user_id'         => $user->id,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        $this->assertCount(3, StatBlock::userMonsters()->get());
    }

    /** @test */
    public function a_stat_block_scopes_session_user_monsters(): void
    {
        $user = User::factory()->create();

        StatBlock::factory()->count(2)->create([
            'stat_block_type' => 'monster',
            'user_id'         => null,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        StatBlock::factory()->count(3)->create([
            'stat_block_type' => 'monster',
            'user_id'         => $user->id,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        $this->assertCount(0, StatBlock::userMonsters()->get());
    }

    /** @test */
    public function a_stat_block_scopes_authenticated_user_characters(): void
    {
        $user = $this->signIn();

        StatBlock::factory()->count(2)->create([
            'stat_block_type' => 'character',
            'user_id'         => null,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        StatBlock::factory()->count(3)->create([
            'stat_block_type' => 'character',
            'user_id'         => $user->id,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        $this->assertCount(3, StatBlock::userCharacters()->get());
    }

    /** @test */
    public function a_stat_block_scopes_session_user_characters(): void
    {
        $user = User::factory()->create();

        StatBlock::factory()->count(2)->create([
            'stat_block_type' => 'character',
            'user_id'         => null,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        StatBlock::factory()->count(3)->create([
            'stat_block_type' => 'character',
            'user_id'         => $user->id,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        $this->assertCount(0, StatBlock::userCharacters()->get());
    }

    /** @test */
    public function a_stat_block_scopes_authenticated_user_npcs(): void
    {
        $user = $this->signIn();

        StatBlock::factory()->count(2)->create([
            'stat_block_type' => 'npc',
            'user_id'         => null,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        StatBlock::factory()->count(3)->create([
            'stat_block_type' => 'npc',
            'user_id'         => $user->id,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        $this->assertCount(3, StatBlock::userNpcs()->get());
    }

    /** @test */
    public function a_stat_block_scopes_session_user_npcs(): void
    {
        $user = User::factory()->create();

        StatBlock::factory()->count(2)->create([
            'stat_block_type' => 'npc',
            'user_id'         => null,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        StatBlock::factory()->count(3)->create([
            'stat_block_type' => 'npc',
            'user_id'         => $user->id,
            'team_id'         => null,
            'session_id'      => null,
        ]);

        $this->assertCount(0, StatBlock::userNpcs()->get());
    }

    /** @test */
    public function a_stat_block_gets_ability_modifiers(): void
    {
        $statBlock = StatBlock::factory()->make([
            'strength'     => 12,
            'dexterity'    => 12,
            'constitution' => 12,
            'intelligence' => 12,
            'wisdom'       => 12,
            'charisma'     => 12,
        ]);

        foreach (StatBlock::ABILITIES as $ability) {
            $this->assertEquals(1, $statBlock->{$ability . "_modifier"});
        }
    }

    /** @test */
    public function a_stat_block_gets_initiative_modifier(): void
    {
        $statBlock = StatBlock::factory()->make([
            'dexterity' => 12
        ]);

        $this->assertEquals(1, $statBlock->initiative);
    }

    /** @test */
    public function a_stat_block_gets_experience_points(): void
    {
        $statBlock = StatBlock::factory()->make([
            'challenge_rating' => 12
        ]);

        $this->assertEquals('8,400', $statBlock->experience_points);

        $statBlock = StatBlock::factory()->make([
            'challenge_rating' => null
        ]);

        $this->assertEquals(null, $statBlock->experience_points);
    }

    /** @test */
    public function a_stat_block_gets_dynamic_array_attributes(): void
    {
        $dynamicValues = [
            'senses',
            'damage_vulnerabilities',
            'damage_resistances',
            'damage_immunities',
            'condition_immunities',
            'languages',
        ];

        $statBlock = StatBlock::factory()->make([
            'senses'                 => 'acid;fire;cold',
            'damage_vulnerabilities' => 'acid;fire;cold',
            'damage_resistances'     => 'acid;fire;cold',
            'damage_immunities'      => 'acid;fire;cold',
            'condition_immunities'   => 'acid;fire;cold',
            'languages'              => 'acid;fire;cold',
        ]);

        foreach ($dynamicValues as $dynamicValue) {
            $this->assertEquals([
                [
                    'id'    => 'acid',
                    'value' => 'acid',
                ],
                [
                    'id'    => 'fire',
                    'value' => 'fire',
                ],
                [
                    'id'    => 'cold',
                    'value' => 'cold',
                ]
            ], $statBlock->{$dynamicValue . '_array'});
        }

        $this->assertEquals([], $statBlock->speed_array);
    }

    /** @test */
    public function a_stat_block_gets_skills_array_attribute(): void
    {
        $expected = [
            ['name' => 'acrobatics', 'value' => 4],
            ['name' => 'perception', 'value' => 1],
        ];

        $statBlock = StatBlock::factory()->make([
            'acrobatics' => 4,
            'perception' => 1,
        ]);

        $this->assertEquals($expected, $statBlock->skills_array);
    }

    /** @test */
    public function a_stat_block_gets_saves_array_attribute(): void
    {
        $expected = [
            ['name' => 'strength', 'value' => -1],
            ['name' => 'dexterity', 'value' => 0],
            ['name' => 'intelligence', 'value' => 2],
            ['name' => 'wisdom', 'value' => 3],
            ['name' => 'charisma', 'value' => 4],
        ];

        $statBlock = StatBlock::factory()->make([
            'strength_save'     => -1,
            'dexterity_save'    => 0,
            'intelligence_save' => 2,
            'wisdom_save'       => 3,
            'charisma_save'     => 4,
        ]);

        $this->assertEquals($expected, $statBlock->saves_array);
    }
}
