<?php

namespace App\Combatant;

class CalculateHitDice
{
    public $hp;
    public $modifier;
    public $size;

    private $hitDice = [
        'Tiny'       => '4',
        'Small'      => '6',
        'Medium'     => '8',
        'Large'      => '10',
        'Huge'       => '12',
        'Gargantuan' => '20',
    ];

    public function calculate($hp, $modifier, $size)
    {
        $this->hp = $hp;
        $this->modifier = $modifier;
        $this->size = $size;

        return "{$this->numberOfDiceString()}{$this->additionalHitPointsString()}";
    }

    private function additionalHitPoints()
    {
        // Hit Points  - (Number of Dice * Dice Average) = Additional Hit Points
        return intval(floor($this->hp - ($this->numberOfDice() * $this->hitDiceAverage())));
    }

    private function numberOfDice()
    {
        // Hit Points / (Hit Dice Average + Constitution Modifier) = Number of Dice
        return round($this->hp / ($this->hitDiceAverage() + $this->modifier));
    }

    private function hitDiceAverage()
    {
        return ($this->hitDice[$this->size] + 1) / 2;
    }

    private function numberOfDiceString()
    {
        return "{$this->numberOfDice()}d{$this->hitDice[$this->size]}";
    }

    private function additionalHitPointsString()
    {
        if ($this->additionalHitPoints() === 0) {
            return;
        }

        return "+{$this->additionalHitPoints()}";
    }
}
