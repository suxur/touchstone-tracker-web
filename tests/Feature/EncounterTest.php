<?php

namespace Tests\Feature;

use App\Models\Character;
use App\Models\Encounter;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class EncounterTest extends TestCase
{
    use DatabaseMigrations;



//    /** @test */
//    public function a_user_cannot_save_an_encounter(): void
//    {
//        /** @var Encounter $encounter */
//        $encounter = Encounter::factory()->create();
//
//        $response = $this->post("/encounter/{$encounter->id}/save");
//
//        $response->assertUnauthorized();
//    }

    /** @test */
    public function when_a_user_views_a_session_encounter_they_are_redirected(): void
    {
        // given we have a session encounter
        $this->get('/e');

        // after a user signs in and views the encounter
        /** @var User $user */
        $user = User::factory()->withPersonalTeam()->create();
        $this->actingAs($user);

        $slug = session()->get('encounter_slug');
        $encounter = Encounter::whereSlug($slug)->first();


        $this->get('/e')->assertRedirect($encounter->path());
    }

    /** @test */
    public function when_a_user_views_a_session_encounter_it_is_saved(): void
    {
        // given we have a session encounter
        $this->get('/e');

        // after a user signs in and views the encounter
        /** @var User $user */
        $user = User::factory()->withPersonalTeam()->create();
        $this->actingAs($user);

        $slug = session()->get('encounter_slug');
        $encounter = Encounter::whereSlug($slug)->first();


        $response = $this->get($encounter->path());

        $this->assertEquals($user->id, $encounter->fresh()->user_id);
        $response->assertSessionMissing('encounter_slug');
    }

    /** @test */
    public function a_user_can_save_an_encounter(): void
    {
        [$user, $encounter] = $this->createEncounterWithUser();

        $this->actingAs($user);

        $this->post("/encounter/{$encounter->id}/save");

        $this->assertCount(1, $user->fresh()->encounters);
    }

    /** @test */
    public function a_user_cannot_update_an_encounter_it_does_not_own(): void
    {
        /** @var User $randomUser */
        $randomUser = User::factory()->create();

        [$user, $encounter] = $this->createEncounterWithUser();

        $this->actingAs($randomUser);

        $this->assertFalse($encounter->is_active);

        $encounter->is_active = true;
        $response = $this->post("/encounter/{$encounter->id}/update", [
            'encounter' => $encounter->toArray()
        ]);

        $response->assertForbidden();
        $this->assertFalse($encounter->fresh()->is_active);
    }

    /** @test */
    public function a_user_can_start_an_encounter(): void
    {
        [$user, $encounter] = $this->createEncounterWithUser();

        $this->actingAs($user);

        $this->assertFalse($encounter->is_active);

        $encounter->is_active = true;
        $this->post("/encounter/{$encounter->id}/update", [
            'encounter' => $encounter->toArray()
        ]);

        $this->assertTrue($encounter->fresh()->is_active);
    }

    /** @test */
    public function a_user_can_stop_an_encounter(): void
    {
        /** @var User $user */
        $user = User::factory()->withPersonalTeam()->create();
        /** @var Encounter $encounter */
        $encounter = Encounter::factory()->active()->create([
            'user_id' => $user->id
        ]);

        $this->actingAs($user);

        $this->assertTrue($encounter->is_active);
        $encounter->is_active = false;
        $this->post("/encounter/{$encounter->id}/update", [
            'encounter' => $encounter->toArray()
        ]);

        $this->assertFalse($encounter->fresh()->is_active);
    }

    /** @test */
    public function a_user_can_create_and_add_a_character_to_encounter(): void
    {
        [$user, $encounter] = $this->createEncounterWithUser();

        $this->actingAs($user);

        $this->assertDatabaseCount('combatants', 0);

        $this->post("/encounter/{$encounter->id}/add/character", [
            'combatants' => [
                [
                    'id'              => null,
                    'name'            => 'Alodray',
                    'encounter_stats' => [
                        'hit_points' => 0,
                        'initiative' => 0
                    ]
                ]
            ]
        ]);

        $this->assertDatabaseHas('characters', ['name' => 'Alodray']);
        $this->assertDatabaseCount('combatants', 1);
    }

    /** @test */
    public function a_user_can_add_a_character_to_encounter(): void
    {
        [$user, $encounter] = $this->createEncounterWithUser();
        /** @var Character $character */
        $character = Character::factory()->create([
            'name' => 'Alodray'
        ]);

        $this->actingAs($user);

        $this->post("/encounter/{$encounter->id}/add/character", [
            'combatants' => [
                [
                    'id'              => $character->id,
                    'name'            => $character->name,
                    'encounter_stats' => [
                        'hit_points' => 0,
                        'initiative' => 0
                    ]
                ]
            ]
        ]);

        $this->assertDatabaseCount('characters', 1);
        $this->assertDatabaseCount('combatants', 1);
    }

    /** @test */
    public function a_user_can_add_multiple_characters_to_encounter(): void
    {
        [$user, $encounter] = $this->createEncounterWithUser();

        /** @var Character $character1 */
        $character1 = Character::factory()->create([
            'name' => 'Alodray'
        ]);
        /** @var Character $character2 */
        $character2 = Character::factory()->create([
            'name' => 'Rost'
        ]);

        $this->actingAs($user);

        $this->post("/encounter/{$encounter->id}/add/character", [
            'combatants' => [
                [
                    'id'              => $character1->id,
                    'name'            => $character1->name,
                    'encounter_stats' => [
                        'hit_points' => 0,
                        'initiative' => 0
                    ]
                ],
                [
                    'id'              => $character2->id,
                    'name'            => $character2->name,
                    'encounter_stats' => [
                        'hit_points' => 0,
                        'initiative' => 0
                    ]
                ]
            ]
        ]);

        $this->assertDatabaseCount('characters', 2);
        $this->assertDatabaseCount('combatants', 2);
    }

    private function createEncounterWithUser(): array
    {
        /** @var User $user */
        $user = User::factory()->withEncounter()->withPersonalTeam()->create();
        /** @var Encounter $encounter */
        $encounter = $user->encounters()->first();

        return [$user, $encounter];
    }
}

