<?php

namespace App\Actions\Jetstream;

use App\Models\Action;
use App\Models\Monster;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CreateMonster
{
    /**
     * @param User|null $user
     * @param array     $input
     * @return Monster|Model
     * @throws ValidationException
     */
    public function create(?User $user, array $input)
    {
        Validator::make($input, [
            'name'        => ['required', 'string', 'max:255'],
            'armor_class' => ['required', 'int'],
            'hit_points'  => ['required', 'int'],
        ])->validate();

        // TODO: Add AddingMonster Event
        // AddingMonster::dispatch($user);

        $monster = Monster::create([
            'user_id'                => optional($user)->id,
            'name'                   => $input['name'],
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
            'speed'                  => implode(', ', Arr::pluck($input['speed'], 'value')),
            'senses'                 => implode(', ', Arr::pluck($input['senses'], 'value')),
            'damage_vulnerabilities' => implode(', ', Arr::pluck($input['damage_vulnerabilities'], 'value')),
            'damage_resistances'     => implode(', ', Arr::pluck($input['damage_resistances'], 'value')),
            'damage_immunities'      => implode(', ', Arr::pluck($input['damage_immunities'], 'value')),
            'condition_immunities'   => implode(', ', Arr::pluck($input['condition_immunities'], 'value')),
            'languages'              => implode(', ', Arr::pluck($input['languages'], 'value')),
            'challenge_rating'       => $input['challenge_rating'] ?? 0,
            'strength_save'          => $this->findSave($input['saves'], 'strength'),
            'dexterity_save'         => $this->findSave($input['saves'], 'dexterity'),
            'constitution_save'      => $this->findSave($input['saves'], 'constitution'),
            'intelligence_save'      => $this->findSave($input['saves'], 'intelligence'),
            'wisdom_save'            => $this->findSave($input['saves'], 'wisdom'),
            'charisma_save'          => $this->findSave($input['saves'], 'charisma'),
            'acrobatics'             => $this->findSkill($input['skills'], 'acrobatics'),
            'animal_handling'        => $this->findSkill($input['skills'], 'animal_handling'),
            'arcana'                 => $this->findSkill($input['skills'], 'arcana'),
            'athletics'              => $this->findSkill($input['skills'], 'athletics'),
            'deception'              => $this->findSkill($input['skills'], 'deception'),
            'history'                => $this->findSkill($input['skills'], 'history'),
            'insight'                => $this->findSkill($input['skills'], 'insight'),
            'intimidation'           => $this->findSkill($input['skills'], 'intimidation'),
            'investigation'          => $this->findSkill($input['skills'], 'investigation'),
            'medicine'               => $this->findSkill($input['skills'], 'medicine'),
            'nature'                 => $this->findSkill($input['skills'], 'nature'),
            'perception'             => $this->findSkill($input['skills'], 'perception'),
            'performance'            => $this->findSkill($input['skills'], 'performance'),
            'persuasion'             => $this->findSkill($input['skills'], 'persuasion'),
            'religion'               => $this->findSkill($input['skills'], 'religion'),
            'sleight_of_hand'        => $this->findSkill($input['skills'], 'sleight_of_hand'),
            'stealth'                => $this->findSkill($input['skills'], 'stealth'),
            'survival'               => $this->findSkill($input['skills'], 'survival'),
            'collection'             => $input['collection'],
        ]);

        $actions = [];
        foreach ($input['traits'] as $key => $action) {
            $actions[] = [
                'combatant_id'   => $monster->id,
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
                'combatant_id'   => $monster->id,
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
                'combatant_id'   => $monster->id,
                'combatant_type' => 'monster',
                'name'           => $action['name'] ?? '',
                'description'    => $action['description'],
                'sort'           => $key,
                'is_reaction'    => true,
                'is_special'     => false,
                'is_legendary'   => false,
            ];
        }

        foreach ($input['legendary_actions'] as $key => $action) {
            $actions[] = [
                'combatant_id'   => $monster->id,
                'combatant_type' => 'monster',
                'name'           => $action['name'] ?? '',
                'description'    => $action['description'],
                'sort'           => $key,
                'is_reaction'    => true,
                'is_special'     => false,
                'is_legendary'   => true,
            ];
        }

        Action::insert($actions);

        return $monster;
    }

    private function findSave($saves, $type)
    {
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
