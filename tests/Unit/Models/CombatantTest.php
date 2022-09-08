<?php

namespace Tests\Unit\Models;

use App\Models\Combatant;
use App\Models\Encounter;
use App\Models\StatBlock;
use Illuminate\Database\Eloquent\Collection;

class CombatantTest extends ModelTestCase
{
    protected ?string $table = 'combatants';
    protected array $columns = [
        'id',
        'encounter_id',
        'stat_block_id',
        'name',
        'type',
        'hit_point_maximum',
        'current_hit_points',
        'temporary_hit_points',
        'armor_class',
        'initiative',
        'action',
        'bonus_action',
        'reaction',
        'death_save_success',
        'death_save_failure',
        'is_hidden',
        'order',
        'created_at',
        'updated_at'
    ];

    /** @test */
    public function a_combatant_belongs_to_an_encounter(): void
    {
        $combatant = Combatant::factory()->create();

        $this->assertInstanceOf(Encounter::class, $combatant->encounter);
    }

    /** @test */
    public function a_combatant_belongs_to_a_stat_block(): void
    {
        $combatant = Combatant::factory()->create();

        $this->assertInstanceOf(StatBlock::class, $combatant->statBlock);
    }

    /** @test */
    public function a_combatant_belongs_to_many_conditions(): void
    {
        $combatant = Combatant::factory()->create();

        $this->assertInstanceOf(Collection::class, $combatant->conditions);
    }
}
