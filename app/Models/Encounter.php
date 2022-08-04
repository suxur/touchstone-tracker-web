<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Encounter extends Model
{
    use SoftDeletes;
    use HasFactory;

    public const COMBATANT_MONSTER = 'monster';
    public const COMBATANT_CHARACTER = 'character';

    protected $combatantPivotColumns = [
        'unique_id', 'unique_name', 'combatant_type', 'hit_points', 'initiative', 'action', 'bonus_action', 'reaction', 'extra_action', 'death_save_success', 'death_save_failure', 'order',
    ];

    protected $fillable = [
        'slug',
        'round',
        'monster_hp_status',
        'character_hp_status',
        'hide_monsters_while_not_active',
        'active_index',
        'is_active',
        'started_at',
    ];

    protected $with = [
        'combatants',
    ];

    protected $appends = [
        'created_at_diff',
    ];

    protected $casts = [
        'user_id'   => 'integer',
        'is_active' => 'boolean',
    ];

    protected $dates = [
        'started_at',
    ];

    public function path()
    {
        return "/e/{$this->slug}";
    }

    public function combatants()
    {
        return $this->hasMany(Combatant::class)->orderBy('order');
    }

    public function characters()
    {
        return $this->combatants()->where('type', 'character');
    }

    public function monsters()
    {
        return $this->combatants()->where('type', 'monster');
    }

    public function getCombatantsCountAttribute()
    {
        return $this->combatants()->count();
    }

    public function getCreatedAtDiffAttribute()
    {
        if (!empty($this->created_at)) {
            return $this->created_at->diffForHumans();
        }

        return null;
    }

    /**
     * Scope a query to only include expired sessions.
     *
     * @return Builder
     */
    public function scopeExpired(Builder $query)
    {
        return $query->whereNull('user_id')->whereDate('created_at', '<=', Carbon::now()->subWeek());
    }

    /**
     * Scope a query to only include expired trash.
     *
     * @return Builder
     */
    public function scopeTrash(Builder $query)
    {
        return $query->onlyTrashed()->whereDate('deleted_at', '<=', Carbon::now()->subMonth());
    }

    public function addCharacterCombatant(StatBlock $character)
    {
        $this->characters()->attach([
            $character->id => [
                'unique_name' => $character->name,
                'unique_id'   => Str::random(8),
                'hit_points'  => $character->hit_points,
                'initiative'  => $character->dexterity,
                'order'       => $this->combatants_count,
            ],
        ]);
    }

    public function addMonsterCombatant(StatBlock $character)
    {
        $updateData = [
            'unique_name' => $character->name,
            'unique_id'   => Str::random(8),
            'hit_points'  => $character->hit_points,
            'initiative'  => $character->initiative,
            'order'       => $this->combatants_count,
        ];

        if (($count = $this->combatants()->where('id', $character->id)->count()) > 0) {
            $updateData['unique_name'] = $character->name.' '.$count;
        }

        $this->combatants()->attach([
            $character->id => $updateData,
        ]);
    }
}
