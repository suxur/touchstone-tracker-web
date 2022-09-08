<?php

namespace Tests\Unit\Models;

use App\Models\Combatant;
use App\Models\Encounter;
use Carbon\Carbon;

class EncounterTest extends ModelTestCase
{
    protected ?string $table = 'encounters';
    protected array $columns = [
        'id',
        'user_id',
        'slug',
        'round',
        'monster_hp_status',
        'character_hp_status',
        'hide_monsters_while_not_active',
        'active_index',
        'is_active',
        'started_at',
        'created_at',
        'updated_at',
        'deleted_at',
        'name',
    ];

    /** @test */
    public function it_return_the_encounter_url_path()
    {
        $encounter = Encounter::factory()->create([
            'slug' => 'my-slug'
        ]);

        $this->assertEquals('/e/my-slug', $encounter->path());
    }

    /** @test */
    public function an_encounter_has_character_combatants()
    {
        $encounter = Encounter::factory()->create();
        Combatant::factory()->count(2)->create([
            'encounter_id' => $encounter->id,
            'type'         => 'monster'
        ]);
        Combatant::factory()->count(3)->create([
            'encounter_id' => $encounter->id,
            'type'         => 'character'
        ]);

        $this->assertCount(3, $encounter->characters);
        $this->assertCount(5, $encounter->combatants);
    }

    /** @test */
    public function an_encounter_has_monster_combatants()
    {
        $encounter = Encounter::factory()->create();
        Combatant::factory()->count(2)->create([
            'encounter_id' => $encounter->id,
            'type'         => 'monster'
        ]);
        Combatant::factory()->count(3)->create([
            'encounter_id' => $encounter->id,
            'type'         => 'character'
        ]);

        $this->assertCount(2, $encounter->monsters);
        $this->assertCount(5, $encounter->combatants);
    }

    /** @test */
    public function an_encounter_gets_combatants_count()
    {
        $encounter = Encounter::factory()->create();
        Combatant::factory()->count(5)->create([
            'encounter_id' => $encounter->id,
        ]);

        $this->assertEquals(5, $encounter->combatants_count);
    }

    /** @test */
    public function an_encounter_gets_created_at_diff()
    {
        Carbon::setTestNow(Carbon::parse('2021-10-31 00:00:00'));
        $encounter = Encounter::factory()->create([
            'created_at' => Carbon::parse('2021-10-30 23:00:00')
        ]);

        $this->assertEquals('1 hour ago', $encounter->created_at_diff);
    }

    /** @test */
    public function it_scopes_expired_encounters()
    {
        Carbon::setTestNow(Carbon::parse('2021-10-31 00:00:00'));

        Encounter::factory()->count(2)->create([
            'created_at' => Carbon::parse('2021-10-20 00:00:00')
        ]);

        Encounter::factory()->count(3)->create([
            'created_at' => Carbon::parse('2021-10-30 00:00:00')
        ]);

        $this->assertCount(2, Encounter::expired()->get());
        $this->assertCount(5, Encounter::all());
    }

    /** @test */
    public function it_scopes_trashed_encounters()
    {
        Carbon::setTestNow(Carbon::parse('2021-10-31 00:00:00'));

        Encounter::factory()->count(2)->create([
            'created_at' => Carbon::parse('2021-08-20 00:00:00'),
            'deleted_at' => Carbon::parse('2021-09-20 00:00:00')
        ]);

        Encounter::factory()->count(3)->create([
            'created_at' => Carbon::parse('2021-10-30 00:00:00')
        ]);

        $this->assertCount(2, Encounter::trash()->get());
        $this->assertCount(3, Encounter::all());
    }
}
