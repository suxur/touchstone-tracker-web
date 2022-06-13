<?php

namespace App\Import;

use function preg_match;
use function str_replace;

class XML
{
    public const SIZE = [
        'T' => 'tiny',
        'S' => 'small',
        'M' => 'medium',
        'L' => 'large',
        'H' => 'huge',
        'G' => 'gargantuan'
    ];

    public const SAVES = [
        'str' => 'strength',
        'dex' => 'dexterity', 
        'con' => 'constitution', 
        'int' => 'intelligence', 
        'wis' => 'wisdom', 
        'cha' => 'charisma',
    ];

    public const SKILLS = [
        'acrobatics',
        'animal_handling',
        'arcana',
        'athletics',
        'deception',
        'history',
        'insight',
        'intimidation',
        'investigation',
        'medicine',
        'nature',
        'perception',
        'performance',
        'persuasion',
        'religion',
        'sleight_of_hand',
        'stealth',
        'survival',
    ];

    public function parse(string $path, string $collection)
    {
        $xmlDataString = file_get_contents($path);
        $xmlObject = simplexml_load_string($xmlDataString);

        $json = json_encode($xmlObject);
        $jsonObject = json_decode($json);
        $data = json_decode($json, true);

        if (gettype($jsonObject->monster) === 'object') {
            $data['monster'] = [$data['monster']];
        }

        $statBlocks = collect($data['monster'])->map(function ($monster) {
            foreach ($monster as $key => $value) {
                if (empty($value)) {
                    $monster[$key] = null;
                }
            }

            return $monster;
        });

        $parsedData = [];

        foreach ($statBlocks as $monster) {
            $parsedData[] = [
                'name'                   => $monster['name'],
                'type'                   => $this->getType($monster['type']),
                'subtype'                => $this->getSubType($monster['type']),
                'armor_class'            => $this->getArmorClass($monster['ac']),
                'armor_description'      => $this->getArmorDescription($monster['ac']),
                'stat_block_type'        => 'monster',
                'hit_points'             => $this->getHitPoints($monster['hp']),
                'hit_dice'               => $this->getHitDice($monster['hp']),
                'cr'                     => $monster['cr'],
                'strength'               => $monster['str'],
                'dexterity'              => $monster['dex'],
                'constitution'           => $monster['con'],
                'intelligence'           => $monster['int'],
                'wisdom'                 => $monster['wis'],
                'charisma'               => $monster['cha'],
                'size'                   => self::SIZE[$monster['size']],
                'alignment'              => $monster['alignment'],
                'speed'                  => $this->getValueArray($monster['speed']),
                'saves'                  => $this->getSavingThrows($monster),
                'skills'                 => $this->getSkills($monster),
                'damage_vulnerabilities' => $this->getValueArray($monster['vulnerable']),
                'damage_resistances'     => $this->getValueArray($monster['resist']),
                'damage_immunities'      => $this->getValueArray($monster['immune']),
                'condition_immunities'   => $this->getValueArray($monster['conditionImmune']),
                'senses'                 => $this->getValueArray($monster['senses']),
                'languages'              => $this->getValueArray($monster['languages'], ','),
                'traits'                 => isset($monster['trait']) ? $this->getActions($monster['trait']) : [],
                'actions'                => isset($monster['action']) ? $this->getActions($monster['action']) : [],
                'reactions'              => isset($monster['reaction']) ? $this->getActions($monster['reaction']) : [],
                'legendary_actions'      => isset($monster['legendary']) ? $this->getActions($monster['legendary']) : [],
                'legendary_description'  => null,
                'collection'             => $collection ?? 'Uncategorized'
            ];
        }

        return $parsedData;
    }

    public function getActions(array $actions)
    {
        $data = [];

        $actions = isset($actions[0]) ? $actions : [$actions];

        foreach ($actions as $action) {
            $data[] = [
                'name'           => is_array($action['name']) ? null : $action['name'],
                'description'    => is_array($action['text']) ? implode("\n\n", array_filter($action['text'])) : $action['text'],
                /* 'attack_bonus'   => isset($action['attack']) ? XML::getAttackBonus($action['attack']) : 0, */
                /* 'damage_dice'    => isset($action['attack']) ? XML::getDamageDice($action['attack']) : null, */
            ];
        }

        return $data;
    }

    public function getValueArray($attribute, $separater = ';')
    {
        $values = [];
        $attributeValues = explode($separater, $attribute);

        foreach ($attributeValues as $attributeValue) {
            if (trim($attributeValue) !== '') {
                $values[] = ['value' => trim($attributeValue)];
            }
        }

        return $values;
    }

    public function getArmorClass($string)
    {
        preg_match('/(\d+)/', $string, $matches);
        return $matches[1] ?? null;
    }

    public function getArmorDescription($string): ?string
    {
        preg_match('/\((.+)\)/', $string, $matches);
        return $matches[1] ?? null;
    }

    public function getHitPoints($string)
    {
        preg_match('/(\d+)/', $string, $matches);
        return $matches[1] ?? null;
    }

    public function getHitDice($string)
    {
        preg_match('/\((.+)\)/', $string, $matches);
        return $matches[1] ?? null;
    }

    public function getSavingThrows($monster)
    {
        $savingThrows = [];

        foreach (self::SAVES as $key => $save) {
            if ($value = $this->getSavingThrow($monster['save'], $key)) {
                $savingThrows[] = [
                    'name'  => $save,
                    'value' => $value,
                ];
            }
        }

        return $savingThrows;
    }

    public function getSavingThrow($string, $type)
    {
        preg_match("/$type\s\+(\d+)/i", $string, $matches);

        return $matches[1] ?? null;
    }

    public function getSkills($monster)
    {
        $skills = [];

        foreach (self::SKILLS as $skill) {
            if ($value = $this->getSkill($monster['skill'], $skill)) {
                $skills[] = [
                    'name'  => $skill,
                    'value' => $value,
                ];
            }
        }

        return $skills;
    }

    public function getSkill($string, $type)
    {
        $type = str_replace('_', ' ', $type);
        preg_match("/$type\s\+(\d+)/i", $string, $matches);

        return $matches[1] ?? null;
    }

    public function getType($string)
    {
        preg_match("/(.+)\(/", $string, $matches);
        return trim($matches[1] ?? null);
    }

    public function getSubType($string)
    {
        preg_match("/\((.+)\)/", $string, $matches);
        return trim($matches[1] ?? null);
    }

    public function getAttackBonus($string)
    {
        if (is_array($string)) {
            $string = $string[0];
        }
        $parts = explode('|', $string);
        return isset($parts[1]) && $parts[1] !== '' ? $parts[1] : 0;
    }

    public function getDamageDice($string)
    {
        if (is_array($string)) {
            $string = $string[0];
        }
        $parts = explode('|', $string);
        return $parts[2];
    }
}
