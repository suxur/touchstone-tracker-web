<?php

namespace Tests\Feature;

use App\Models\Encounter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateCombatantTest extends TestCase
{
    use RefreshDatabase;

    public function test_combatants_can_be_created()
    {
        $encounter = Encounter::factory()->create();

        $this->assertCount(0, $encounter->fresh()->combatants);

        $this->post("/api/encounters/{$encounter->id}/add/combatant", [
            'name' => 'Test Combatant',
            'type' => 'Monster'
        ]);

        $this->assertCount(1, $encounter->fresh()->combatants);
        $this->assertEquals('Test Combatant', $encounter->fresh()->combatants()->latest('id')->first()->name);
    }
}
