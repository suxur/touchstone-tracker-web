<?php

namespace App\Actions\Jetstream;

use App\Models\Action;
use App\Models\Monster;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use function strtolower;

class UpdateMonster
{
    /**
     * Remove the team member from the given team.
     *
     * @param User    $user
     * @param Monster $monster
     * @param array   $input
     * @return void
     * @throws AuthorizationException
     * @throws ValidationException
     */
    public function update(User $user, Monster $monster, array $input): void
    {
        $this->authorize($user, $monster);

        Validator::make($input, [
            'name'        => ['required', 'string', 'max:255'],
            'armor_class' => ['required', 'int'],
            'hit_points'  => ['required', 'int'],
        ])->validate();

        $monster->update([
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

        $actionIds = [];
        foreach ($input['traits'] as $key => $data) {
            $action = Action::findOrNew($data['id']);
            $action->fill([
                'combatant_id'   => $monster->id,
                'combatant_type' => 'monster',
                'name'           => $data['name'] ?? '',
                'description'    => $data['description'],
                'sort'           => $key,
                'is_reaction'    => false,
                'is_special'     => true,
                'is_legendary'   => false,
            ])->save();
            $actionIds[] = $action->id;
        }

        foreach ($input['actions'] as $key => $data) {
            $action = Action::findOrNew($data['id']);
            $action->fill([
                'combatant_id'   => $monster->id,
                'combatant_type' => 'monster',
                'name'           => $data['name'] ?? '',
                'description'    => $data['description'],
                'sort'           => $key,
                'is_reaction'    => false,
                'is_special'     => false,
                'is_legendary'   => false,
            ])->save();
            $actionIds[] = $action->id;
        }

        foreach ($input['reactions'] as $key => $data) {
            $action = Action::findOrNew($data['id']);
            $action->fill([
                'combatant_id'   => $monster->id,
                'combatant_type' => 'monster',
                'name'           => $data['name'] ?? '',
                'description'    => $data['description'],
                'sort'           => $key,
                'is_reaction'    => true,
                'is_special'     => false,
                'is_legendary'   => false,
            ])->save();
            $actionIds[] = $action->id;
        }

        foreach ($input['legendary_actions'] as $key => $data) {
            $action = Action::findOrNew($data['id']);
            $action->fill([
                'combatant_id'   => $monster->id,
                'combatant_type' => 'monster',
                'name'           => $data['name'] ?? '',
                'description'    => $data['description'],
                'sort'           => $key,
                'is_reaction'    => true,
                'is_special'     => false,
                'is_legendary'   => true,
            ]);
            $actionIds[] = $action->id;
        }

        $newActions = Action::select('id')->whereIn('id', $actionIds)->get()->pluck('id');
        $oldActions = Action::select('id')->where('combatant_id', $monster->id)->get()->pluck('id');
        $actionIdsToDelete = $oldActions->diff($newActions);
        Action::whereIn('id', $actionIdsToDelete)->delete();
    }

    /**
     * Authorize that the user can remove the team member.
     *
     * @param User    $user
     * @param Monster $monster
     * @return void
     * @throws AuthorizationException
     */
    protected function authorize(User $user, Monster $monster): void
    {
        if (!Gate::forUser($user)->check('update', $monster)) {
            throw new AuthorizationException;
        }
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
