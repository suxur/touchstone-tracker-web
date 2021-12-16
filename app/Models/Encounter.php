<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class Encounter extends Model
{
    use SoftDeletes, HasFactory;

    public const COMBATANT_MONSTER = 'monster';
    public const COMBATANT_CHARACTER = 'character';

    protected $combatantPivotColumns = [
        'unique_id', 'unique_name', 'combatant_type', 'hit_points', 'initiative', 'action', 'bonus_action', 'reaction', 'extra_action', 'death_save_success', 'death_save_failure', 'order'
    ];

    protected $fillable = [
        'slug',
    ];

//    protected $with = [
//        'monsters',
//        'characters',
//    ];

    protected $appends = [
        'combatants',
        'created_at_diff'
    ];

    protected $casts = [
        'user_id'   => 'integer',
        'is_active' => 'boolean'
    ];

    protected $dates = [
        'started_at'
    ];

    public function path()
    {
        return "/e/{$this->slug}";
    }

    public function monsters()
    {
        return $this->morphedByMany(Monster::class, 'combatant')->using(Combatant::class)->withPivot($this->combatantPivotColumns)->as('encounter_stats')->orderBy('order')->using(EncounterStats::class);
    }

    public function characters()
    {
        return $this->morphedByMany(Character::class, 'combatant')->using(Combatant::class)->withPivot($this->combatantPivotColumns)->as('encounter_stats')->orderBy('order')->using(EncounterStats::class);
    }

    public function getCombatantsAttribute(): Collection
    {
        $combatants = collect();
        $this->characters->map(function ($character) use ($combatants) {
            $combatants->push($character);
        });
        $this->monsters->map(function ($monster) use ($combatants) {
            $combatants->push($monster);
        });

        return $combatants->sortBy(function ($combatant) {
            return $combatant->encounter_stats->order;
        })->values();
    }

    public function getCombatantsCountAttribute()
    {
        return $this->getCombatantsAttribute()->count();
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
     * @param Builder $query
     * @return Builder
     */
    public function scopeExpired(Builder $query)
    {
        return $query->whereNull('user_id')->whereDate('created_at', '<=', Carbon::now()->subWeek());
    }

    /**
     * Scope a query to only include expired trash.
     *
     * @param Builder $query
     * @return Builder
     */
    public function scopeTrash(Builder $query)
    {
        return $query->onlyTrashed()->whereDate('deleted_at', '<=', Carbon::now()->subMonth());
    }

    public function addCharacterCombatant(Character $character)
    {
        $this->characters()->attach([
            $character->id => [
                'unique_name' => $character->name,
                'unique_id'   => Str::random(8),
                'hit_points'  => $character->hit_points,
                'initiative'  => $character->dexterity,
                'order'       => $this->combatants_count,
            ]
        ]);
    }

    public function addMonsterCombatant(Monster $monster)
    {
//        if ($combatant['id']) {
//            $monster = Monster::find($combatant['id']);
//        } else {
//            $monsterData = [
//                'name' => $combatant['name'],
//                'collection' => 'Uncategorized',
//            ];
//
//            if ($user) {
//                $monsterData['user_id'] = $user->id;
//            }
//
//            $monster = Monster::create($monsterData);
//        }
        $updateData = [
            'unique_name' => $monster->name,
            'unique_id'   => Str::random(8),
            'hit_points'  => $monster->hit_points,
            'initiative'  => $monster->initiative,
            'order'       => $this->combatants_count,
        ];

        if (($count = $this->monsters()->where('id', $monster->id)->count()) > 0) {
            $updateData['unique_name'] = $monster->name . ' ' . $count;
        }

        $this->monsters()->attach([
            $monster->id => $updateData
        ]);
    }
}
