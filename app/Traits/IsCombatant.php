<?php

namespace App\Traits;

use App\Encounters\DifficultyCalculator;
use App\Models\Action;
use App\Models\Combatant;
use App\Models\Spell;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;
use function collect;
use function explode;
use function floor;
use function number_format;
use function str_replace;
use function trim;

trait IsCombatant
{
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
        // 00 = -5
        // 01 = -5
        // 02 = -4
        // 03 = -4
        // 04 = -3
        // 05 = -3
        // 06 = -2
        // 07 = -2
        // 08 = -1
        // 09 = -1
        // 10 = 0
        // 11 = 0
        // 12 = 1
        // 13 = 1
        // 14 = 2
        // 15 = 2
        // 16 = 3
        // 17 = 4
        // 18 = 4
        // 19 = 4
        // 20 = 5
        return $this->getModifier($this->attributes['dexterity']);
    }

    public function getExperiencePointsAttribute(): ?string
    {
        if ($this->attributes['challenge_rating']) {
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
