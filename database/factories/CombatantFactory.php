<?php

namespace Database\Factories;

use App\Models\Combatant;
use App\Models\Encounter;
use App\Models\StatBlock;
use Illuminate\Database\Eloquent\Factories\Factory;

class CombatantFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Combatant::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'encounter_id'         => Encounter::factory(),
            'stat_block_id'        => StatBlock::factory(),
            'name'                 => $this->faker->firstName,
            'type'                 => $this->faker->randomElement(['monster', 'character', 'npc']),
            'hit_point_maximum'    => $this->faker->numberBetween(1, 676),
            'current_hit_points'   => $this->faker->numberBetween(1, 676),
            'temporary_hit_points' => $this->faker->numberBetween(1, 676),
            'armor_class'          => $this->faker->numberBetween(5, 20),
            'initiative'           => $this->faker->numberBetween(5, 20),
            'action'               => $this->faker->boolean,
            'bonus_action'         => $this->faker->boolean,
            'reaction'             => $this->faker->boolean,
            'death_save_success'   => $this->faker->numberBetween(0, 3),
            'death_save_failure'   => $this->faker->numberBetween(0, 3),
            'is_hidden'            => $this->faker->boolean,
            'order'                => $this->faker->numberBetween(0, 20),
        ];
    }
}
