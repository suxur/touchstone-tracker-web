<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Combatant extends Model
{
    use HasFactory;

    protected $fillable = [
        'armor_class',
        'current_hit_points',
        'initiative',
        'name',
        'order',
        'type',
        'action',
        'bonus_action',
        'reaction',
        'death_save_success',
        'death_save_failure',
        'hit_point_maximum',
    ];

    protected $casts = [
        'action'       => 'boolean',
        'bonus_action' => 'boolean',
        'reaction'     => 'boolean',
        'hit_points'   => 'integer',
        'initiative'   => 'integer',
        'order'        => 'integer'
    ];

    protected $with = [
        'statBlock',
        'conditions',
    ];

    public function encounter(): BelongsTo
    {
        return $this->belongsTo(Encounter::class);
    }

    public function statBlock(): BelongsTo
    {
        return $this->belongsTo(StatBlock::class);
    }

    public function conditions(): BelongsToMany
    {
        return $this->belongsToMany(Condition::class);
    }
}
