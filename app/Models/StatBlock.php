<?php

namespace App\Models;

use App\Collections\StatBlockCollection;
use App\Encounters\DifficultyCalculator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class StatBlock extends Model
{
    use HasFactory;

    protected $guarded = [
        'traits',
        'actions',
        'reactions',
        'legendary_actions',
    ];

    protected $casts = [
        'armor_class' => 'integer',
        'initiative'  => 'integer',
        'hit_points'  => 'integer',
    ];

    protected $appends = [
        'initiative',
    ];

    protected $with = [
        'specialAbilities',
        'actions',
        'reactions',
        'legendaryActions',
    ];

    public const RACES = [
        'Aarakocra',
        'Dragonborn',
        'Dwarf',
        'Elf',
        'Genasi',
        'Gnome',
        'Goliath',
        'Half-Elf',
        'Half-Orc',
        'Halfling',
        'Human',
        'Kenku',
        'Tiefling',
        'Aasimar',
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
        'Wizard',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function combatant(): HasOne
    {
        return $this->hasOne(Combatant::class);
    }

    public function actionsRelationship(): HasMany
    {
        return $this->hasMany(Action::class);
    }

    public function specialAbilities(): HasMany
    {
        return $this->hasMany(Action::class)->where('is_special', '=', true)->orderBy('sort');
    }

    public function actions(): HasMany
    {
        return $this->hasMany(Action::class)
            ->where('is_special', '=', false)
            ->where('is_reaction', '=', false)
            ->where('is_legendary', '=', false)
            ->orderBy('sort');
    }

    public function reactions(): HasMany
    {
        return $this->hasMany(Action::class)->where('is_reaction', '=', true)->orderBy('sort');
    }

    public function legendaryActions(): HasMany
    {
        return $this->hasMany(Action::class)->where('is_legendary', '=', true)->orderBy('sort');
    }

    public function spells(): BelongsToMany
    {
        return $this->belongsToMany(Spell::class);
    }

    public function scopePreloadedMonsters($query)
    {
        return $query->select(['id', 'name', 'collection'])->monsters();
    }

    public function scopeMonsters($query)
    {
        return $query->where('stat_block_type', 'monster')
                     ->whereNull('user_id')
                     ->whereNull('team_id')
                     ->whereNull('session_id');
    }

    public function scopeUserMonsters($query)
    {
        if (auth()->user()) {
            return $query->where('stat_block_type', 'monster')
                ->where('user_id', auth()->user()->id);
        }

        return $query->where('stat_block_type', 'monster')
            ->where('session_id', session()->getId());
    }

    public function scopeCharacters($query)
    {
        return $query->where('stat_block_type', 'character');
    }

    public function scopeUserCharacters($query)
    {
        if (auth()->user()) {
            return $query->where('stat_block_type', 'character')
                ->where('user_id', auth()->user()->id);
        }

        return $query->where('stat_block_type', 'character')
            ->where('session_id', session()->getId());
    }

    public function scopeNpcs($query)
    {
        return $query->where('stat_block_type', 'npc');
    }

    public function getStrengthModifierAttribute()
    {
        if (isset($this->attributes['strength'])) {
            return $this->getModifier($this->attributes['strength']);
        }

        return null;
    }

    public function getDexterityModifierAttribute()
    {
        return $this->getModifier($this->attributes['dexterity']);
    }

    public function getConstitutionModifierAttribute()
    {
        return $this->getModifier($this->attributes['constitution']);
    }

    public function getIntelligenceModifierAttribute()
    {
        return $this->getModifier($this->attributes['intelligence']);
    }

    public function getWisdomModifierAttribute()
    {
        return $this->getModifier($this->attributes['wisdom']);
    }

    public function getCharismaModifierAttribute()
    {
        return $this->getModifier($this->attributes['charisma']);
    }

    public function getInitiativeAttribute()
    {
        if (isset($this->attributes['dexterity'])) {
            return $this->getModifier($this->attributes['dexterity']);
        }

        return 0;
    }

    public function getExperiencePointsAttribute(): ?string
    {
        if (isset($this->attributes['challenge_rating'])) {
            return number_format(DifficultyCalculator::EXPERIENCE_POINTS_BY_CHALLENGE_RATING[$this->attributes['challenge_rating']]);
        }

        return null;
    }

    public function getSpeedArrayAttribute(): array
    {
        return $this->getDynamicValueArray($this->attributes['speed']);
    }

    public function getSensesArrayAttribute(): array
    {
        return $this->getDynamicValueArray($this->attributes['senses']);
    }

    public function getDamageVulnerabilitiesArrayAttribute(): array
    {
        return $this->getDynamicValueArray($this->attributes['damage_vulnerabilities']);
    }

    public function getDamageResistancesArrayAttribute(): array
    {
        return $this->getDynamicValueArray($this->attributes['damage_resistances']);
    }

    public function getDamageImmunitiesArrayAttribute(): array
    {
        return $this->getDynamicValueArray($this->attributes['damage_immunities']);
    }

    public function getConditionImmunitiesArrayAttribute(): array
    {
        return $this->getDynamicValueArray($this->attributes['condition_immunities']);
    }

    public function getLanguagesArrayAttribute(): array
    {
        return $this->getDynamicValueArray($this->attributes['languages']);
    }

    public function getSkillsArrayAttribute(): array
    {
        $skills = [];
        foreach (Combatant::SKILLS as $skill) {
            if ($value = $this->attributes[Str::snake($skill)]) {
                $skills[] = [
                    'id'    => Str::random(),
                    'name'  => $skill,
                    'value' => $value,
                ];
            }
        }

        return $skills;
    }

    public function getSavesArrayAttribute(): array
    {
        $saves = [];
        foreach (Combatant::ABILITIES as $ability) {
            if ($value = $this->attributes[$ability.'_save']) {
                $saves[] = [
                    'id'    => Str::random(),
                    'name'  => $ability,
                    'value' => $value,
                ];
            }
        }

        return $saves;
    }

    public function newCollection(array $models = [])
    {
        return new StatBlockCollection($models);
    }

    private function getDynamicValueArray($data): array
    {
        if ($data) {
            return collect(explode(',', str_replace(';', ',', $data)))->map(static function ($attribute) {
                return [
                    'id'    => Str::random(),
                    'value' => trim($attribute),
                ];
            })->toArray();
        }

        return [];
    }

    private function getModifier($value)
    {
        return intval(floor(($value - 10) / 2));
//        $modifier = intval(floor(($value - 10) / 2));
//        if ($modifier > 0) {
//            return $modifier;
//        }
//
//        return $modifier;
    }
}
