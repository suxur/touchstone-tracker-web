<?php

namespace Database\Factories;

use App\Models\Combatant;
use App\Models\Encounter;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EncounterFactory extends Factory
{
    protected $model = Encounter::class;

    public function definition(): array
    {
        return [
            'user_id'                        => null,
            'slug'                           => Str::random(8),
            'name'                           => null,
            'is_active'                      => false,
            'active_index'                   => 0,
            'round'                          => 1,
            'monster_hp_status'              => -1,
            'character_hp_status'            => -1,
            'hide_monsters_while_not_active' => true,
            'started_at'                     => Carbon::now(),
            'created_at'                     => Carbon::now()
        ];
    }

    public function active(): EncounterFactory
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => true
            ];
        });
    }

//    public function withCombatants($attributes = []): EncounterFactory
//    {
//        return $this->hasAttached(Combatant::factory()->count(3), $attributes);
//    }
}
