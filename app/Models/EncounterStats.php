<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphPivot;

class EncounterStats extends MorphPivot
{
    protected $casts = [
        'hit_points' => 'integer',
        'initiative' => 'integer',
        'order'      => 'integer'
    ];
}
