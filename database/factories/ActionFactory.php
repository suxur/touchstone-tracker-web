<?php

namespace Database\Factories;

use App\Models\Action;
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
            'id'             => null,
            'combatant_id'   => null,
            'combatant_type' => null,
            'name'           => $this->faker->name,
            'description'    => $this->faker->text,
            'attack_bonus'   => $this->faker->numberBetween(0, 10),
            'damage_dice'    => null,
            'sort'           => 0,
            'is_reaction'    => $this->faker->boolean,
            'is_special'     => $this->faker->boolean,
            'is_legendary'   => $this->faker->boolean,
        ];
    }
}
