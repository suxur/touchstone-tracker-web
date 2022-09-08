<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Models\Combatant;
use App\Models\Condition;
use App\Models\Encounter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CombatantControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_update_a_combatant(): void
    {
        $combatant = Combatant::factory()->create(["armor_class" => "10"]);

        $response = $this
            ->withSession(['encounter_slug' => $combatant->encounter->slug])
            ->putJson("/api/combatants/{$combatant->id}", [
                "armor_class" => "15"
            ]);

        $response->assertOk();
        $this->assertEquals("15", $combatant->fresh()->armor_class, "15");
    }

    /** @test */
    public function a_user_can_update_a_combatants_conditions(): void
    {
        $condition = Condition::factory()->create();
        $combatant = Combatant::factory()->create();
        session('encounter_slug', $combatant->encounter->slug);

        $response = $this
            ->withSession(['encounter_slug' => $combatant->encounter->slug])
            ->putJson("/api/combatants/{$combatant->id}", [
            "conditions" => [$condition]
        ]);

        $response->assertOk();
        $this->assertCount(1, $combatant->fresh()->conditions);
    }

    /** @test */
    public function a_user_cannot_update_a_combatant_that_belongs_to_a_different_encounter(): void
    {
        $encounter1 = Encounter::factory()->create();
        $encounter2 = Encounter::factory()->create();

        session('encounter_slug', $encounter2->slug);

        $combatant = Combatant::factory()->create([
            "encounter_id" => $encounter1
        ]);

        $response = $this->putJson("/api/combatants/{$combatant->id}", [
            "armor_class" => "15"
        ]);

        $response->assertForbidden();
    }
}
