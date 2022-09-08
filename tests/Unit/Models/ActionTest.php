<?php

namespace Tests\Unit\Models;

use App\Models\Action;
use App\Models\StatBlock;

class ActionTest extends ModelTestCase
{
    protected ?string $table = 'actions';
    protected array $columns = [
        'id',
        'stat_block_id',
        'name',
        'description',
        'attack_bonus',
        'damage_dice',
        'damage_bonus',
        'sort',
        'is_reaction',
        'is_special',
        'is_legendary',
        'created_at',
        'updated_at'
    ];

    /** @test */
    public function it_casts_columns_to_correct_type()
    {
        $action = Action::factory()->create();

        $this->assertIsBool($action->is_reaction);
        $this->assertIsBool($action->is_legendary);
        $this->assertIsBool($action->is_special);
    }

    /** @test */
    public function an_action_belongs_to_a_stat_block(): void
    {
        $action = Action::factory()->create();

        $this->assertInstanceOf(StatBlock::class, $action->statBlock);
    }
}
