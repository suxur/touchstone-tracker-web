<?php

namespace App\Import;

use function preg_match;
use function str_replace;

class XML
{
    public function getArmorClass($string)
    {
        preg_match('/(\d+)/', $string, $matches);
        return $matches[1] ?? null;
    }

    public function getArmorDescription($string): ?string
    {
        preg_match('/\((.+)\)/', $string, $matches);
        return $matches[1] ?? null;
    }

    public function getHitPoints($string)
    {
        preg_match('/(\d+)/', $string, $matches);
        return $matches[1] ?? null;
    }

    public function getHitDice($string)
    {
        preg_match('/\((.+)\)/', $string, $matches);
        return $matches[1] ?? null;
    }

    public function getSavingThrow($string, $type)
    {
        preg_match("/$type\s\+(\d+)/i", $string, $matches);
        return $matches[1] ?? null;
    }

    public function getSkill($string, $type)
    {
        $type = str_replace('_', ' ', $type);
        preg_match("/$type\s\+(\d+)/i", $string, $matches);
        return $matches[1] ?? null;
    }

    public function getType($string)
    {
        preg_match("/(.+)\(/", $string, $matches);
        return trim($matches[1] ?? null);
    }

    public function getSubType($string)
    {
        preg_match("/\((.+)\)/", $string, $matches);
        return trim($matches[1] ?? null);
    }

    public function getAttackBonus($string)
    {
        if (is_array($string)) {
            $string = $string[0];
        }
        $parts = explode('|', $string);
        return isset($parts[1]) && $parts[1] !== '' ? $parts[1] : 0;
    }

    public function getDamageDice($string)
    {
        if (is_array($string)) {
            $string = $string[0];
        }
        $parts = explode('|', $string);
        return $parts[2];
    }
}
