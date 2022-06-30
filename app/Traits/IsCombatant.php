<?php

namespace App\Traits;

use Facades\App\Combatant\CalculateAbilityModifier;
use App\Encounters\DifficultyCalculator;
use App\Models\Action;
use App\Models\Combatant;
use App\Models\Spell;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;
use function collect;
use function explode;
use function number_format;
use function str_replace;
use function trim;

trait IsCombatant
{
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
