<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Encounter extends Model
{
    use SoftDeletes;
    use HasFactory;

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected $fillable = [
        'slug',
        'name',
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
        return $this->created_at->diffForHumans();
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
}
