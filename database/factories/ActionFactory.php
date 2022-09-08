<?php

namespace Database\Factories;

use App\Models\Action;
use App\Models\Combatant;
use App\Models\StatBlock;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Action::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'stat_block_id'   => StatBlock::factory(),
            'name'           => $this->faker->name,
            'description'    => $this->faker->text,
            'attack_bonus'   => $this->faker->numberBetween(0, 10),
            'damage_dice'    => null,
            'damage_bonus'   => 0,
            'sort'           => 0,
            'is_reaction'    => $this->faker->numberBetween(0, 1),
            'is_special'     => $this->faker->numberBetween(0, 1),
            'is_legendary'   => $this->faker->numberBetween(0, 1),
        ];
    }
}
