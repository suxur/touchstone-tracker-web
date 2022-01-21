<?php

namespace Tests\Feature;

use App\Models\StatBlock;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StatBlockTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_create_stat_blocks(): void
    {
        $this->withoutExceptionHandling();

        $attributes = StatBlock::factory()->raw();
        $attributes['saves'] = [];
        $attributes['skills'] = [];
        $attributes['traits'] = [];
        $attributes['actions'] = [];
        $attributes['reactions'] = [];

        $response = $this->post('/stat-blocks', $attributes);
        $response->assertStatus(303);

        $this->assertDatabaseHas('stat_blocks', ['name' => $attributes['name']]);
    }

    /** @test */
    public function a_stat_block_requires_a_name(): void
    {
        $attributes = StatBlock::factory()->raw(['name' => '']);
        $this->post('/stat-blocks', $attributes)->assertSessionHasErrors('name');
    }
}
