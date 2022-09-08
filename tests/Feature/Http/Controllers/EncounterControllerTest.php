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
        $response->assertOk();
    }

    /** @test */
    public function an_authenticated_user_is_redirected_to_show_page()
    {
        $this->signIn();

        $response = $this->get('/e');
        $response->assertRedirect();
        $session = session('encounter_slug');
        $response->assertLocation("/e/$session");
    }

    /** @test */
    public function a_user_can_lookup_an_encounter(): void
    {
        $response = $this->post('/e', ['lookup' => '']);
        $response->assertInvalid(['lookup']);

        $response = $this->post('/e', ['lookup' => 1234]);
        $response->assertInvalid(['lookup']);

        $response = $this->post('/e', ['lookup' => 'https://touchstone-tracker.app/p/abc123']);
        $response->assertInvalid(['lookup']);

        $encounter = Encounter::factory()->create();
        $response = $this->post('/e', ['lookup' => "https://touchstone-tracker.app/p/{$encounter->slug}"]);
        $response->assertValid();
        $response->assertRedirect();
    }

    /** @test */
    public function an_authenticated_user_can_view_show_page()
    {
        $user = $this->signIn();
        $encounter = Encounter::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->get("/e/{$encounter->slug}");
        $response->assertOk();
    }

    /** @test */
    public function a_session_encounter_gets_updated_with_user_id()
    {
        $user = $this->signIn();
        $encounter = Encounter::factory()->create();
        session(['encounter_slug' => $encounter->slug]);

        $this->assertNull($encounter->user_id);
        $response = $this->get("/e/{$encounter->slug}");
        $response->assertOk();
        $this->assertEquals($user->id, $encounter->fresh()->user_id);
    }
}
