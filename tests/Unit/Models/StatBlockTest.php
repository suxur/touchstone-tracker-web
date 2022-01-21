<?php

namespace Tests\Unit\Models;

use App\Models\StatBlock;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class StatBlockTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function a_stat_block_can_belong_to_a_team(): void
    {
        $statBlock = StatBlock::factory()->create();

        $this->assertInstanceOf(BelongsTo::class, $statBlock->team());
    }
}
