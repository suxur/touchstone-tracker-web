<?php

namespace App\Combatant;

class CalculateAbilityModifier
{
    public function calculate($value)
    {
        return intval(floor(($value - 10) / 2));
    }
}
