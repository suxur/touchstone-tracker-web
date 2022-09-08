<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Models\Spell;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SpellControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_view_a_spell()
    {
        $spell = Spell::factory()->create();

        $response = $this->get("/api/spells/{$spell->id}");
        $response->assertOk();
    }
}
