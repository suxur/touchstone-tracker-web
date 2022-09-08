<?php

namespace Tests\Unit\Models;


use App\Models\Spell;
use App\Models\StatBlock;
use Illuminate\Database\Eloquent\Collection;

class SpellTest extends ModelTestCase
{
    protected ?string $table = 'spells';
    protected array $columns = [
        'id',
        'name',
        'description',
        'higher_level',
        'page',
        'range',
        'components',
        'material',
        'duration',
        'casting_time',
        'level',
        'level_int',
        'school',
        'class',
        'archetype',
        'circles',
        'domains',
        'oaths',
        'patrons',
        'is_ritual',
        'requires_concentration',
        'created_at',
        'updated_at',
    ];

    /** @test */
    public function a_spell_belongs_to_many_stat_blocks(): void
    {
        $spell = Spell::factory()
            ->has(StatBlock::factory()->count(3))
            ->create();

        $this->assertInstanceOf(Collection::class, $spell->statBlocks);
        $this->assertCount(3, $spell->statBlocks);
    }
}
