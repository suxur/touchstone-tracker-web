<?php

namespace App\Models;

use App\Collections\StatBlockCollection;
use Facades\App\Encounters\DifficultyCalculator;
use Facades\App\Combatant\CalculateAbilityModifier;
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

    public const ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    public const SKILLS = ['acrobatics', 'animal handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight of hand', 'stealth', 'survival'];

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
        return $this->actionsRelationship()->where('is_special', '=', true)->orderBy('sort');
    }

    public function actions(): HasMany
    {
        return $this->actionsRelationship()
            ->where('is_special', '=', false)
            ->where('is_reaction', '=', false)
            ->where('is_legendary', '=', false)
            ->orderBy('sort');
    }

    public function reactions(): HasMany
    {
        return $this->actionsRelationship()->where('is_reaction', '=', true)->orderBy('sort');
    }

    public function legendaryActions(): HasMany
    {
        return $this->actionsRelationship()->where('is_legendary', '=', true)->orderBy('sort');
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
        return $query
            ->where('stat_block_type', 'monster')
            ->whereNull('user_id')
            ->whereNull('team_id')
            ->whereNull('session_id');
    }

    public function scopeUserMonsters($query)
    {
        return $this->scopedByType($query, 'monster');
    }

    public function scopeUserCharacters($query)
    {
        return $this->scopedByType($query, 'character');
    }

    public function scopeUserNpcs($query)
    {
        return $this->scopedByType($query, 'npc');
    }

    public function getStrengthModifierAttribute()
    {
        return $this->getModifier($this->attributes['strength']);
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
        return DifficultyCalculator::experiencePoints($this->attributes['challenge_rating']);
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
        return array_reduce(self::SKILLS, function($carry, $item) {
            $value = $this->attributes[Str::snake($item)];
            $this->addAttributeToArray($carry, $item, $value);
            return $carry;
        }, []);
    }

    public function getSavesArrayAttribute(): array
    {
        return array_reduce(self::ABILITIES, function($carry, $item) {
            $value = $this->attributes[$item . '_save'];
            $this->addAttributeToArray($carry, $item, $value);
            return $carry;
        }, []);
    }

    public function newCollection(array $models = [])
    {
        return new StatBlockCollection($models);
    }

    private function addAttributeToArray(&$array, $item, $value)
    {
        if ($value !== null) {
            $array[] = [
                'name'  => $item,
                'value' => $value,
            ];
        }
    }

    private function getDynamicValueArray($data): array
    {
        if ($data) {
            return collect(explode(',', str_replace(';', ',', $data)))->map(static function ($attribute) {
                return [
                    'id'    => Str::kebab($attribute),
                    'value' => trim($attribute),
                ];
            })->toArray();
        }

        return [];
    }

    private function getModifier($value)
    {
        return CalculateAbilityModifier::calculate($value);
    }

    private function scopedByType($query, $type)
    {
        if (!in_array($type, ['character', 'monster', 'npc'])) return $query;

        if (auth()->user()) {
            return $query
                ->where('stat_block_type', $type)
                ->where('user_id', auth()->user()->id);
        }

        return $query
            ->where('stat_block_type', $type)
            ->where('session_id', session()->getId());
    }
}
