<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Models\Encounter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EncounterControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function an_authenticated_user_can_view_an_encounter()
    {
        $user = $this->signIn();

        $encounter = Encounter::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->getJson("/api/encounters/{$encounter->slug}");
        $response->assertOk();
    }

    /** @test */
    public function a_user_can_view_their_session_encounter()
    {
        $encounter = Encounter::factory()->create();

        $response = $this
            ->withSession(['encounter_slug' => $encounter->slug])
            ->getJson("/api/encounters/{$encounter->slug}");

        $response->assertOk();
    }

    /** @test */
    public function an_unauthenticated_user_cannot_create_encounters(): void
    {
        $response = $this->postJson('/api/encounters');
        $response->assertUnauthorized();
    }

    /** @test */
    public function an_authenticated_user_can_create_encounters(): void
    {
        $this->signIn();

        $response = $this->postJson('/api/encounters');
        $response->assertStatus(200);

        $this->assertDatabaseCount('encounters', 1);
    }

    /** @test */
    public function an_unauthenticated_user_cannot_delete_encounters(): void
    {
        $encounter = Encounter::factory()->create();

        $response = $this->deleteJson("/api/encounters/{$encounter->id}");
        $response->assertUnauthorized();
    }

    /** @test */
    public function an_unauthorized_user_cannot_delete_encounters(): void
    {
        $this->signIn();

        $encounter = Encounter::factory()->create();

        $response = $this->deleteJson("/api/encounters/{$encounter->slug}");
        $response->assertForbidden();
    }

    /** @test */
    public function an_authenticated_user_can_delete_encounters(): void
    {
        $user = $this->signIn();

        $encounter = Encounter::factory()->create([
            'user_id' => $user,
        ]);

        $response = $this->deleteJson("/api/encounters/{$encounter->slug}");
        $response->assertSuccessful();
    }

    /** @test */
    public function a_paywall_user_can_name_an_encounter(): void
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();

        $encounter = Encounter::factory()->create([
            'user_id' => $user,
        ]);

        $response = $this->patchJson("/api/encounters/{$encounter->id}", ["name" => "Twig Blight Encounter"]);
        $response->assertSuccessful();

        $this->assertEquals("Twig Blight Encounter", $encounter->fresh()->name);
    }
}
