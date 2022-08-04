<?php

namespace App\Models;

use App\Combatant\CalculateAbilityModifier;
use App\Encounters\DifficultyCalculator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

class Combatant extends Model
{
    use HasFactory;

    public const ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    public const SKILLS = ['acrobatics', 'animal handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight of hand', 'stealth', 'survival'];

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

    public function encounter()
    {
        return $this->belongsTo(Encounter::class);
    }

    public function statBlock()
    {
        return $this->belongsTo(StatBlock::class);
    }

    public function conditions()
    {
        return $this->belongsToMany(Condition::class);
    }

    public function getStrengthModifierAttribute()
    {
        if (isset($this->attributes['strength'])) {
            return CalculateAbilityModifier::calculate($this->attributes['strength']);
        }

        return null;
    }

    public function getDexterityModifierAttribute()
    {
        return CalculateAbilityModifier::calculate($this->attributes['dexterity']);
    }

    public function getConstitutionModifierAttribute()
    {
        return CalculateAbilityModifier::calculate($this->attributes['constitution']);
    }

    public function getIntelligenceModifierAttribute()
    {
        return CalculateAbilityModifier::calculate($this->attributes['intelligence']);
    }

    public function getWisdomModifierAttribute()
    {
        return CalculateAbilityModifier::calculate($this->attributes['wisdom']);
    }

    public function getCharismaModifierAttribute()
    {
        return CalculateAbilityModifier::calculate($this->attributes['charisma']);
    }

    public function getInitiativeAttribute()
    {
        if (isset($this->attributes['dexterity'])) {
            return CalculateAbilityModifier::calculate($this->attributes['dexterity']);
        }

        if (isset($this->attributes['initiative'])) {
            return $this->attributes['initiative'];
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

    public function specialAbilities(): MorphMany
    {
        return $this->morphMany(Action::class, 'combatant')->where('is_special', '=', true)->orderBy('sort');
    }

    public function actions(): MorphMany
    {
        return $this->morphMany(Action::class, 'combatant')
            ->where('is_special', '=', false)
            ->where('is_reaction', '=', false)
            ->where('is_legendary', '=', false)
            ->orderBy('sort');
    }

    public function reactions(): MorphMany
    {
        return $this->morphMany(Action::class, 'combatant')->where('is_reaction', '=', true)->orderBy('sort');
    }

    public function legendaryActions(): MorphMany
    {
        return $this->morphMany(Action::class, 'combatant')->where('is_legendary', '=', true)->orderBy('sort');
    }

    public function spells(): BelongsToMany
    {
        return $this->belongsToMany(Spell::class);
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
                    'value' => $value
                ];
            }
        }

        return $skills;
    }

    public function getSavesArrayAttribute(): array
    {
        $saves = [];
        foreach (Combatant::ABILITIES as $ability) {
            if ($value = $this->attributes[$ability . '_save']) {
                $saves[] = [
                    'id'    => Str::random(),
                    'name'  => $ability,
                    'value' => $value
                ];
            }
        }

        return $saves;
    }

    private function getDynamicValueArray($data): array
    {
        if ($data) {
            return collect(explode(',', str_replace(';', ',', $data)))->map(static function ($attribute) {
                return [
                    'id'    => Str::random(),
                    'value' => trim($attribute)
                ];
            })->toArray();
        }

        return [];
    }
}
