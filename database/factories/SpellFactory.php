<?php

namespace Database\Factories;

use App\Models\Spell;
use Illuminate\Database\Eloquent\Factories\Factory;

class SpellFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Spell::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'name'                   => $this->faker->firstName,
            'description'            => $this->faker->text,
            'higher_level'           => $this->faker->text,
            'page'                   => 'phb ' . $this->faker->randomDigit(),
            'range'                  => '90 feet',
            'components'             => 'V, S, M',
            'material'               => $this->faker->text,
            'duration'               => 'Instantaneous',
            'casting_time'           => '1 action',
            'level'                  => '2nd-level',
            'level_int'              => $this->faker->randomDigit(),
            'school'                 => 'Evocation',
            'class'                  => 'Druid, Wizard',
            'archetype'              => null,
            'circles'                => null,
            'domains'                => null,
            'oaths'                  => null,
            'patrons'                => null,
            'is_ritual'              => $this->faker->boolean,
            'requires_concentration' => $this->faker->boolean,
        ];
    }
}
