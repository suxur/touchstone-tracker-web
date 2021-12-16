<?php

namespace App\Models;

use App\Traits\IsCombatant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Monster extends Model
{
    use HasFactory, IsCombatant;

    protected $guarded = [];

    protected $casts = [
        'armor_class' => 'integer',
        'initiative'  => 'integer',
        'hit_points'  => 'integer'
    ];

    protected $appends = [
        'initiative',
        'strength_modifier'
    ];

    protected $with = [
        'specialAbilities',
        'actions',
        'reactions',
        'legendaryActions'
    ];
}
