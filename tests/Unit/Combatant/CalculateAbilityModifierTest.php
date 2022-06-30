<?php

namespace Tests\Unit\Combatant;

use Facades\App\Combatant\CalculateAbilityModifier;
use Tests\TestCase;

class CalculateAbilityModifierTest extends TestCase
{
    /**
     * @test
     * @dataProvider abilityScoreData
     */
    public function it_calculates_the_ability_modifier($expected, $input): void
    {
        $this->assertEquals($expected, CalculateAbilityModifier::calculate($input));
    }

    public function abilityScoreData(): array
    {
        return [
            [-5, 1],
            [-4, 2],
            [-4, 3],
            [-3, 4],
            [-3, 5],
            [-2, 6],
            [-2, 7],
            [-1, 8],
            [-1, 9],
            [0, 10],
            [0, 11],
            [1, 12],
            [1, 13],
            [2, 14],
            [2, 15],
            [3, 16],
            [3, 17],
            [4, 18],
            [4, 19],
            [5, 20],
            [5, 21],
            [6, 22],
            [6, 23],
            [7, 24],
            [7, 25],
            [8, 26],
            [8, 27],
            [9, 28],
            [9, 29],
            [10, 30],
        ];
    }
}
