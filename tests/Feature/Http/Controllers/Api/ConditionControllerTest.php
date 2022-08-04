<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Models\Encounter;
use App\Models\Spell;
use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class ConditionControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_guest_can_get_a_list_of_conditions(): void
    {
        /* StatBlock::factory()->count(10)->create([ */
        /*     'stat_block_type' => 'monster' */
        /* ]); */

        $response = $this->getJson('/api/conditions');
        $response->assertStatus(200);

        $response->assertJson(fn(AssertableJson $json) => $json->first(fn($json) => $json->hasAll('id', 'name'))
        );
    }

    /** @test */
    public function a_guest_can_get_a_list_of_characters(): void
    {
        $encounter = Encounter::factory()->create();

        $response = $this->withSession([
            'encounter_slug' => $encounter->slug
        ])->getJson('/api/codex/characters');

        $response->assertStatus(200);
    }

    /** @test */
    public function a_guest_can_get_a_list_of_spells(): void
    {
        Spell::factory()->count(10)->create();

        $response = $this->getJson('/api/codex/spells');
        $response->assertStatus(200);

        $response->assertJson(fn(AssertableJson $json) => $json->first(fn($json) => $json->hasAll('id', 'name'))
        );
    }

    /** @test */
    public function a_guest_is_unauthorized_to_get_a_list_of_encounters(): void
    {
        $response = $this->getJson('/api/codex/encounters');
        $response->assertUnauthorized();
    }


    /** @test */
    public function a_user_can_get_a_list_of_encounters(): void
    {
        /** @var User $user */
        $user = User::factory()->withEncounter()->withPersonalTeam()->create();
        $this->actingAs($user);

        $response = $this->getJson('/api/codex/encounters');
        $response->assertStatus(200);
    }
}
