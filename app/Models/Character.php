<?php

namespace App\Models;

use App\Traits\IsCombatant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Character extends Model
{
    use HasFactory, IsCombatant;

    protected $guarded = [];

    protected $casts = [
        'armor_class' => 'integer',
        'initiative'  => 'integer',
        'hit_points'  => 'integer'
    ];

    protected $appends = [
        'initiative'
    ];

    protected $with = [
        'specialAbilities',
        'actions',
        'reactions',
        'legendaryActions'
    ];

    public const RACES = [
        'Aarakocra',
        'Dragonborn',
        'Dwarf',
        'Elf',
        'Genasi',
        'Goliath',
        'Half-Elf',
        'Half-Orc',
        'Halfling',
        'Human',
        'Kenku',
        'Tiefling',
        'Aasimar'
    ];

    public const CLASSES = [
        'Artificer',
        'Barbarian',
        'Bard',
        'Cleric',
        'Druid',
        'Fighter',
        'Monk',
        'Paladin',
        'Ranger',
        'Rogue',
        'Sorcerer',
        'Warlock',
        'Wizard'
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
