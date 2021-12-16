<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Encounter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EncounterControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_guest_can_create_a_session_encounter(): void
    {
        $response = $this->get('/e');

        $response->assertSessionHas('encounter_slug');
        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_can_lookup_an_encounter(): void
    {
        $response = $this->post('/e/lookup', ['lookup' => '']);
        $response->assertInvalid(['lookup']);

        $response = $this->post('/e/lookup', ['lookup' => 1234]);
        $response->assertInvalid(['lookup']);

        $response = $this->post('/e/lookup', ['lookup' => 'https://touchstone-tracker.app/p/abc123']);
        $response->assertInvalid(['lookup']);

        $encounter = Encounter::factory()->create();
        $response = $this->post('/e/lookup', ['lookup' => "https://touchstone-tracker.app/p/{$encounter->slug}"]);
        $response->assertValid();
        $response->assertRedirect();
    }
}
