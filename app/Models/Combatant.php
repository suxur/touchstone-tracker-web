<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Combatant extends Model
{
    use HasFactory;

    public const ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    public const SKILLS = ['acrobatics', 'animal handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight of hand', 'stealth', 'survival'];

    protected $guarded = [];

    protected $casts = [
        'action'       => 'boolean',
        'bonus_action' => 'boolean',
        'reaction'     => 'boolean',
        'hit_points'   => 'integer',
        'initiative'   => 'integer',
        'order'        => 'integer'
    ];

    public function encounter()
    {
        return $this->belongsTo(Encounter::class);
    }

    public function statBlock()
    {
        return $this->belongsTo(StatBlock::class);
    }
}
