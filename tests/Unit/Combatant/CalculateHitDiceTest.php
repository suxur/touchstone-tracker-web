<?php

namespace Tests\Unit\Combatant;

use Facades\App\Combatant\CalculateHitDice;
use Tests\TestCase;

class CalculateHitDiceTest extends TestCase
{
    /**
     * @test
     * @dataProvider abilityScoreData
     */
    public function it_calculates_the_ability_modifier($expected, $hp, $modifier, $size): void
    {
        $this->assertEquals($expected, CalculateHitDice::calculate($hp, $modifier, $size));
    }

    public function abilityScoreData(): array
    {
        return [
            ['2d4+2', 7, 1, 'Tiny'],
            ['6d6+6', 27, 1, 'Small'],
            ['2d8', 9, 0, 'Medium'],
            ['13d8+38', 97, 3, 'Medium'],
            ['18d10+36', 135, 2, 'Large'],
            ['20d12+100', 230, 5, 'Huge'],
            ['28d20+252', 546, 9, 'Gargantuan'],
        ];
    }
}
