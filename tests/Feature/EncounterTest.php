<?php

namespace Tests\Feature;

use App\Models\StatBlock;
use App\Models\Combatant;
use App\Models\Encounter;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class EncounterTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function a_session_encounter_is_created_when_going_to_the_index()
    {
        $response = $this->get('/e');
        $response->assertStatus(200);

        $this->assertDatabaseCount('encounters', 1);
        $this->assertNotNull(session()->get('encounter_slug'));
    }

    /** @test */
    public function when_a_user_views_a_session_encounter_they_are_redirected(): void
    {
        // given we have a session encounter
        $this->get('/e');

        // after a user signs in and views the encounter
        $this->signIn();

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
        $user = $this->signIn();

        $slug = session()->get('encounter_slug');
        $encounter = Encounter::whereSlug($slug)->first();

        $this->get($encounter->path());

        $this->assertEquals($user->id, $encounter->fresh()->user_id);
    }

    // TODO Move to Api/Encounter
    /*public function a_user_can_create_an_encounter(): void */
    /*{ */
    /*    $this->withoutExceptionHandling(); */

    /*    /1** @var User $user *1/ */
    /*    $user = $this->signIn(); */
    /*    $this->assertCount(0, $user->encounters); */

    /*    $response = $this->post('/encounters/create'); */
    /*    $response->assertRedirect(); */

    /*    $this->assertCount(1, $user->fresh()->encounters); */
    /*} */

    /*public function a_user_cannot_update_an_encounter_it_does_not_own(): void */
    /*{ */
    /*    /1** @var User $randomUser *1/ */
    /*    $randomUser = User::factory()->create(); */

    /*    [$user, $encounter] = $this->createEncounterWithUser(); */

    /*    $this->actingAs($randomUser); */

    /*    $this->assertFalse($encounter->is_active); */

    /*    $encounter->is_active = true; */
    /*    $response = $this->post("/encounter/{$encounter->id}/update", [ */
    /*        'encounter' => $encounter->toArray() */
    /*    ]); */

    /*    $response->assertForbidden(); */
    /*    $this->assertFalse($encounter->fresh()->is_active); */
    /*} */

    /** @test */
    /* public function a_user_can_start_an_encounter(): void */
    /* { */
    /*     [$user, $encounter] = $this->createEncounterWithUser(); */

    /*     $this->actingAs($user); */

    /*     $this->assertFalse($encounter->is_active); */

    /*     $encounter->is_active = true; */
    /*     $this->post("/encounter/{$encounter->id}/update", [ */
    /*         'encounter' => $encounter->toArray() */
    /*     ]); */

    /*     $this->assertTrue($encounter->fresh()->is_active); */
    /* } */

    /** @test */
    /*public function a_user_can_stop_an_encounter(): void */
    /*{ */
    /*    /1** @var User $user *1/ */
    /*    $user = User::factory()->withPersonalTeam()->create(); */
    /*    /1** @var Encounter $encounter *1/ */
    /*    $encounter = Encounter::factory()->active()->create([ */
    /*        'user_id' => $user->id */
    /*    ]); */

    /*    $this->actingAs($user); */

    /*    $this->assertTrue($encounter->is_active); */

    /*    $encounter->is_active = false; */

    /*    $response = $this->post("/encounter/{$encounter->id}/update", [ */
    /*        'encounter' => $encounter->toArray() */
    /*    ]); */

    /*    $response->assertRedirect(); */
    /*    $this->assertFalse($encounter->fresh()->is_active); */
    /*} */

    /*/1** @test *1/ */
    /*public function a_user_can_create_and_add_a_combatant_to_encounter(): void */
    /*{ */
    /*    $this->withoutExceptionHandling(); */
    /*    [$user, $encounter] = $this->createEncounterWithUser(); */

    /*    $this->actingAs($user); */

    /*    $this->assertDatabaseCount('combatants', 0); */

    /*    $this->post("/encounter/{$encounter->id}/add/combatant", [ */
    /*        'name' => 'Alodray', */
    /*        'type' => 'character' */
    /*    ]); */

    /*    $this->assertDatabaseHas('combatants', ['name' => 'Alodray']); */
    /*    $this->assertDatabaseCount('combatants', 1); */
    /*} */

    /*/1** @test *1/ */
    /*public function a_user_can_add_a_combatant_to_an_encounter(): void */
    /*{ */
    /*    [$user, $encounter] = $this->createEncounterWithUser(); */

    /*    /1** @var StatBlock $statBlock *1/ */
    /*    $statBlock = StatBlock::factory()->create(); */

    /*    $this->actingAs($user); */

    /*    $this->assertDatabaseCount('combatants', 0); */
    /*    $this->post("/encounter/{$encounter->id}/add/combatant/{$statBlock->id}"); */
    /*    $this->assertDatabaseCount('combatants', 1); */
    /*} */

    /*/1** @test *1/ */
    /*public function a_user_can_add_multiple_characters_to_encounter(): void */
    /*{ */
    /*    $this->withoutExceptionHandling(); */
    /*    [$user, $encounter] = $this->createEncounterWithUser(); */

    /*    /1** @var StatBlock $character1 *1/ */
    /*    $character1 = StatBlock::factory()->create(); */

    /*    /1** @var StatBlock $character2 *1/ */
    /*    $character2 = StatBlock::factory()->create(); */

    /*    $this->assertDatabaseCount('stat_blocks', 2); */

    /*    $this->actingAs($user); */

    /*    $this->post("/encounter/{$encounter->id}/add/combatants", [ */
    /*        'ids' => [ */
    /*            $character1->id, */
    /*            $character2->id, */
    /*        ] */
    /*    ]); */

    /*    $this->assertDatabaseCount('combatants', 2); */
    /*} */

    /*/1** @test *1/ */
    /*public function a_user_can_remove_a_combatant_from_an_encounter(): void */
    /*{ */
    /*    $this->withoutExceptionHandling(); */
    /*    $encounter = Encounter::factory()->has(Combatant::factory()->count(3))->create(); */

    /*    $combatant = $encounter->combatants->first(); */

    /*    $this->assertDatabaseCount('combatants', 3); */

    /*    $response = $this->post("/encounter/{$encounter->id}/remove/combatant/{$combatant->id}"); */

    /*    $response->assertRedirect(); */

    /*    $this->assertDatabaseCount('combatants', 2); */
    /*} */

    /*private function createEncounterWithUser(): array */
    /*{ */
    /*    /1** @var User $user *1/ */
    /*    $user = User::factory()->withEncounter()->withPersonalTeam()->create(); */
    /*    /1** @var Encounter $encounter *1/ */
    /*    $encounter = $user->encounters()->first(); */

    /*    return [$user, $encounter]; */
    /*} */
}

