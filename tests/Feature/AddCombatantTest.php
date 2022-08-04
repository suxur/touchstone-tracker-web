<?php

namespace Tests\Feature;

use App\Actions\Combatant\AddCombatant;
use App\Models\Encounter;
use App\Models\StatBlock;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddCombatantTest extends TestCase
{
    use RefreshDatabase;

    public function test_combatants_can_be_added()
    {
        /** @var Encounter $encounter */
        $encounter = Encounter::factory()->create();
        /** @var StatBlock $statBlock */
        $statBlock = StatBlock::factory()->create([
            'name' => 'Test Combatant'
        ]);

        $this->assertCount(0, $encounter->fresh()->combatants);

        app(AddCombatant::class)->add($encounter, $statBlock);

        $this->assertCount(1, $encounter->fresh()->combatants);
        $this->assertEquals('Test Combatant', $encounter->fresh()->combatants()->latest('id')->first()->name);
    }
}
