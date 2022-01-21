<?php

namespace Database\Factories;

use App\Models\StatBlock;
use Illuminate\Database\Eloquent\Factories\Factory;

class StatBlockFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = StatBlock::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'user_id'                => null,
            'team_id'                => null,
            'name'                   => $this->faker->firstName,
            'type'                   => $this->faker->randomElement(StatBlock::RACES),
            'subtype'                => $this->faker->randomElement(StatBlock::CLASSES),
            'size'                   => $this->faker->randomElement(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']),
            'stat_block_type'         => $this->faker->randomElement(['monster', 'character', 'npc']),
            'alignment'              => $this->faker->randomElement(['lawful good', 'lawful neutral', 'lawful evil', 'neutral good', 'neutral', 'neutral evil', 'chaotic good', 'chaotic neutral', 'chaotic evil']),
            'armor_class'            => $this->faker->numberBetween(5, 25),
            'hit_points'             => $this->faker->numberBetween(1, 676),
            'hit_dice'               => $this->faker->numberBetween(1, 9),
            'speed'                  => null,
            'strength'               => $this->faker->numberBetween(5, 20),
            'dexterity'              => $this->faker->numberBetween(5, 20),
            'constitution'           => $this->faker->numberBetween(5, 20),
            'intelligence'           => $this->faker->numberBetween(5, 20),
            'wisdom'                 => $this->faker->numberBetween(5, 20),
            'charisma'               => $this->faker->numberBetween(5, 20),
            'strength_save'          => null,
            'dexterity_save'         => null,
            'constitution_save'      => null,
            'intelligence_save'      => null,
            'wisdom_save'            => null,
            'charisma_save'          => null,
            'acrobatics'             => null,
            'animal_handling'        => null,
            'arcana'                 => null,
            'athletics'              => null,
            'deception'              => null,
            'history'                => null,
            'insight'                => null,
            'intimidation'           => null,
            'investigation'          => null,
            'medicine'               => null,
            'nature'                 => null,
            'perception'             => null,
            'performance'            => null,
            'persuasion'             => null,
            'religion'               => null,
            'sleight_of_hand'        => null,
            'stealth'                => null,
            'survival'               => null,
            'damage_vulnerabilities' => null,
            'damage_resistances'     => null,
            'damage_immunities'      => null,
            'condition_immunities'   => null,
            'senses'                 => null,
            'languages'              => null,
            'challenge_rating'       => $this->faker->numberBetween(0, 30),
            'legendary_description'  => null,
            'speed_json'             => null,
            'armor_description'      => null,
            'collection'             => null,
        ];
    }
}
