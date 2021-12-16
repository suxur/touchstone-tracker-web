<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Combatant extends Pivot
{
    public const ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    public const SKILLS = ['acrobatics', 'animal handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight of hand', 'stealth', 'survival'];

    protected $casts = [
        'action'       => 'boolean',
        'bonus_action' => 'boolean',
        'reaction'     => 'boolean',
        'extra_action' => 'boolean',
        'hit_points'   => 'integer',
        'initiative'   => 'integer',
        'order'        => 'integer'
    ];
}
