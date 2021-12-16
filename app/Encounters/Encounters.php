<?php

namespace App\Encounters;

use Illuminate\Support\Facades\Facade;

/**
 * Class Encounters
 *
 * @package App\Encounters
 * @method static lookup($param): string
 */
class Encounters extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return EncountersManager::class;
    }
}
