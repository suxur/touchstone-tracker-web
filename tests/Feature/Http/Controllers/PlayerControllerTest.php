<?php

namespace Tests\Feature;

use App\Models\Encounter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PlayerControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_should_return_a_not_found_if_encounter_does_not_exist()
    {
        $response = $this->get('/p/unknown');
        $response->assertStatus(404);
    }

    /** @test */
    public function it_should_get_show_if_found_encounter()
    {
        $encounter = Encounter::factory()->create();

        $response = $this->get("/p/{$encounter->slug}");
        $response->assertStatus(200);
    }
}
