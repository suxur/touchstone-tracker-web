<?php

namespace App\Actions\Jetstream;

use App\Models\Action;
use App\Models\Character;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use function implode;
use function strtolower;

class CreateCharacter
{
    /**
     * @param User|null $user
     * @param array $input
     * @return Character|Model
     * @throws ValidationException
     */
    public function create(?User $user, array $input)
    {
        Validator::make($input, [
            'name'        => ['required', 'string', 'max:255'],
            'armor_class' => ['required', 'int'],
            'hit_points'  => ['required', 'int'],
            'race'        => ['string'],
            'class'       => ['string'],
        ])->validate();

        // TODO: Add AddingCharacter Event
        // AddingCharacter::dispatch($user);

        $character = Character::create([
            'user_id'                => optional($user)->id,
            'name'                   => $input['name'],
            'race'                   => $input['race'],
            'class'                  => $input['class'],
            'armor_class'            => $input['armor_class'],
            'armor_description'      => $input['armor_description'],
            'hit_points'             => $input['hit_points'],
            'hit_dice'               => $input['hit_dice'],
            'size'                   => $input['size'],
            'alignment'              => $input['alignment'],
            'strength'               => $input['strength'],
            'dexterity'              => $input['dexterity'],
            'constitution'           => $input['constitution'],
            'intelligence'           => $input['intelligence'],
            'wisdom'                 => $input['wisdom'],
            'charisma'               => $input['charisma'],
            'speed'                  => $input['speed'] ? implode(', ', Arr::pluck($input['speed'], 'value')) : null,
            'senses'                 => $input['senses'] ? implode(', ', Arr::pluck($input['senses'], 'value')) : null,
            'damage_vulnerabilities' => $input['damage_vulnerabilities'] ? implode(', ', Arr::pluck($input['damage_vulnerabilities'], 'value')) : null,
            'damage_resistances'     => $input['damage_resistances'] ? implode(', ', Arr::pluck($input['damage_resistances'], 'value')) : null,
            'damage_immunities'      => $input['damage_immunities'] ? implode(', ', Arr::pluck($input['damage_immunities'], 'value')) : null,
            'condition_immunities'   => $input['condition_immunities'] ? implode(', ', Arr::pluck($input['condition_immunities'], 'value')) : null,
            'languages'              => $input['languages'] ? implode(', ', Arr::pluck($input['languages'], 'value')) : null,
            'challenge_rating'       => $input['challenge_rating'] ?? 0,
            'strength_save'          => $this->findSave($input['saves'] ?? null, 'strength'),
            'dexterity_save'         => $this->findSave($input['saves'] ?? null, 'dexterity'),
            'constitution_save'      => $this->findSave($input['saves' ?? null], 'constitution'),
            'intelligence_save'      => $this->findSave($input['saves' ?? null], 'intelligence'),
            'wisdom_save'            => $this->findSave($input['saves' ?? null], 'wisdom'),
            'charisma_save'          => $this->findSave($input['saves' ?? null], 'charisma'),
            'acrobatics'             => $this->findSkill($input['skills' ?? null], 'acrobatics'),
            'animal_handling'        => $this->findSkill($input['skills' ?? null], 'animal_handling'),
            'arcana'                 => $this->findSkill($input['skills'] ?? null, 'arcana'),
            'athletics'              => $this->findSkill($input['skills'] ?? null, 'athletics'),
            'deception'              => $this->findSkill($input['skills'] ?? null, 'deception'),
            'history'                => $this->findSkill($input['skills'] ?? null, 'history'),
            'insight'                => $this->findSkill($input['skills'] ?? null, 'insight'),
            'intimidation'           => $this->findSkill($input['skills'] ?? null, 'intimidation'),
            'investigation'          => $this->findSkill($input['skills'] ?? null, 'investigation'),
            'medicine'               => $this->findSkill($input['skills'] ?? null, 'medicine'),
            'nature'                 => $this->findSkill($input['skills'] ?? null, 'nature'),
            'perception'             => $this->findSkill($input['skills'] ?? null, 'perception'),
            'performance'            => $this->findSkill($input['skills'] ?? null, 'performance'),
            'persuasion'             => $this->findSkill($input['skills'] ?? null, 'persuasion'),
            'religion'               => $this->findSkill($input['skills'] ?? null, 'religion'),
            'sleight_of_hand'        => $this->findSkill($input['skills'] ?? null, 'sleight_of_hand'),
            'stealth'                => $this->findSkill($input['skills'] ?? null, 'stealth'),
            'survival'               => $this->findSkill($input['skills'] ?? null, 'survival'),
        ]);

        $actions = [];
        foreach ($input['traits'] as $key => $action) {
            $actions[] = [
                'combatant_id'   => $character->id,
                'combatant_type' => 'monster',
                'name'           => $action['name'] ?? '',
                'description'    => $action['description'],
                'sort'           => $key,
                'is_reaction'    => false,
                'is_special'     => true,
                'is_legendary'   => false,
            ];
        }

        foreach ($input['actions'] as $key => $action) {
            $actions[] = [
                'combatant_id'   => $character->id,
                'combatant_type' => 'monster',
                'name'           => $action['name'] ?? '',
                'description'    => $action['description'],
                'sort'           => $key,
                'is_reaction'    => false,
                'is_special'     => false,
                'is_legendary'   => false,
            ];
        }

        foreach ($input['reactions'] as $key => $action) {
            $actions[] = [
                'combatant_id'   => $character->id,
                'combatant_type' => 'monster',
                'name'           => $action['name'] ?? '',
                'description'    => $action['description'],
                'sort'           => $key,
                'is_reaction'    => true,
                'is_special'     => false,
                'is_legendary'   => false,
            ];
        }

        Action::insert($actions);

        return $character;
    }

    private function findSave($saves, $type)
    {
        if (!$saves) {
            return null;
        }

        foreach ($saves as $save) {
            if (strtolower($save['name']) === $type) {
                return $save['value'];
            }
        }

        return null;
    }

    private function findSkill($saves, $type)
    {
        foreach ($saves as $save) {
            if (strtolower($save['name']) === $type) {
                return $save['value'];
            }
        }

        return null;
    }
}
