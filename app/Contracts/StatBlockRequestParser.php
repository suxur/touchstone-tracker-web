<?php

namespace App\Contracts;

use App\Form\FormOption;
use Illuminate\Support\Arr;

class StatBlockRequestParser
{
    const REACTION_TYPE = 'reactions';
    const TRAIT_TYPE = 'traits';
    const LEGENDARY_TYPE = 'legendary_actions';

    public array $formFields = [
        'user_id'                => 'user',
        'session_id'             => 'session',
        'name'                   => 'string',
        'size'                   => 'string',
        'stat_block_type'        => 'string',
        'type'                   => 'string',
        'subtype'                => 'string',
        'alignment'              => 'string',
        'armor_class'            => 'string|default:0:int',
        'hit_points'             => 'string|default:0:int',
        'hit_dice'               => 'string',
        'armor_description'      => 'string',
        'speed'                  => 'implode',
        'strength'               => 'string|default:10:int',
        'dexterity'              => 'string|default:10:int',
        'constitution'           => 'string|default:10:int',
        'intelligence'           => 'string|default:10:int',
        'wisdom'                 => 'string|default:10:int',
        'charisma'               => 'string|default:10:int',
        'strength_save'          => 'array|key:saves|field:strength',
        'dexterity_save'         => 'array|key:saves|field:dexterity',
        'constitution_save'      => 'array|key:saves|field:constitution',
        'intelligence_save'      => 'array|key:saves|field:intelligence',
        'wisdom_save'            => 'array|key:saves|field:wisdom',
        'charisma_save'          => 'array|key:saves|field:charisma',
        'acrobatics'             => 'array|key:skills',
        'animal_handling'        => 'array|key:skills',
        'arcana'                 => 'array|key:skills',
        'athletics'              => 'array|key:skills',
        'deception'              => 'array|key:skills',
        'history'                => 'array|key:skills',
        'insight'                => 'array|key:skills',
        'intimidation'           => 'array|key:skills',
        'investigation'          => 'array|key:skills',
        'medicine'               => 'array|key:skills',
        'nature'                 => 'array|key:skills',
        'perception'             => 'array|key:skills',
        'performance'            => 'array|key:skills',
        'persuasion'             => 'array|key:skills',
        'religion'               => 'array|key:skills',
        'sleight_of_hand'        => 'array|key:skills',
        'stealth'                => 'array|key:skills',
        'survival'               => 'array|key:skills',
        'damage_vulnerabilities' => 'implode',
        'damage_resistances'     => 'implode',
        'damage_immunities'      => 'implode',
        'condition_immunities'   => 'implode',
        'senses'                 => 'implode',
        'languages'              => 'implode',
        'traits'                 => 'action',
        'actions'                => 'action',
        'reactions'              => 'action',
        'legendary_actions'      => 'action',
        'legendary_description'  => 'string',
        'challenge_rating'       => 'string',
        'collection'             => 'string',
    ];

    public function parse($data): array
    {
        return collect($this->formFields)->map(function ($option, $field) use ($data) {
            $formOption = new FormOption($field, $option);
            switch ($formOption->getType()) {
                case 'user':
                    return optional(auth()->user())->id;
                case 'session':
                    return auth()->user() ? null : session()->getId();
                case 'string':
                    return $this->getValueOrNull($data, $field) ?? $formOption->getDefault();
                case 'array':
                    return $this->getValueByType($this->getValueOrNull($data, $formOption->getKey()), $formOption->getField() ?? $field);
                case 'action':
                    return $this->parseActions($this->getValueOrNull($data, $field), $field);
                case 'implode':
                    return $this->getImplodeAndPluck($data, $field);
                default:
                    return null;
            }
        })->toArray();
    }

    private function parseActions($data, $actionType): array
    {
        $actions = [];
        if (isset($data)) {
            foreach ($data as $key => $action) {
                $actions[] = [
                    'name'         => $action['name'] ?? '',
                    'description'  => $action['description'],
                    'sort'         => $key,
                    'is_reaction'  => $actionType === self::REACTION_TYPE,
                    'is_special'   => $actionType === self::TRAIT_TYPE,
                    'is_legendary' => $actionType === self::LEGENDARY_TYPE,
                ];
            }
        }
        return $actions;
    }

    private function getValueOrNull($data, $type)
    {
        return $data[$type] ?? null;
    }

    private function getValueByType($items, $type)
    {
        if (!$items) return null;

        return optional(collect($items)->filter(function ($item) use ($type) {
            return strtolower($item['name']) === $type;
        })->first())['value'];
    }

    private function getImplodeAndPluck($data, $key): ?string
    {
        if (!isset($data[$key])) return null;

        $value = implode(', ', Arr::pluck($data[$key], 'value'));

        return $value === '' ? null : $value;
    }
}
