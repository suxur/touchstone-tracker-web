<?php

namespace Tests\Unit;

use Facades\App\Import\XML;
use Tests\TestCase;

class ImportXMLTest extends TestCase
{
    /** @test */
    public function it_returns_a_stat_block_as_an_array()
    {
        $file = base_path('tests/Files/ImportXML.xml');

        $results = XML::parse($file, 'Curse of Strahd');

        $this->assertEquals($this->expectedStatBlockAsArray(), $results);
    }

    /** @test */
    public function it_parses_armor_class()
    {
        $string = '15 (natural armor)';
        $results = XML::getArmorClass($string);

        $this->assertEquals('15', $results);
    }

    /** @test */
    public function it_parses_armor_description(): void
    {
        $string = '15 (natural armor)';
        $results = XML::getArmorDescription($string);

        $this->assertEquals('natural armor', $results);
    }

    /** @test */
    public function it_parses_hit_points()
    {
        $string = '120 (16d8+48)';
        $results = XML::getHitPoints($string);

        $this->assertEquals('120', $results);
    }

    /** @test */
    public function it_parses_hit_dice(): void
    {
        $string = '120 (16d8+48)';
        $results = XML::getHitDice($string);

        $this->assertEquals('16d8+48', $results);
    }

    /** @test */
    public function it_parses_saving_throws_by_type()
    {
        $string = 'Con +9, Wis +1, Cha +2';

        $results = XML::getSavingThrow($string, 'con');
        $this->assertEquals('9', $results);

        $results = XML::getSavingThrow($string, 'wis');
        $this->assertEquals('1', $results);

        $results = XML::getSavingThrow($string, 'cha');
        $this->assertEquals('2', $results);
    }

    /** @test */
    public function it_parses_skills()
    {
        $string = 'Animal Handling +5, Arcana +13, Religion +13';

        $results = XML::getSkill($string, 'animal_handling');
        $this->assertEquals('5', $results);

        $results = XML::getSkill($string, 'arcana');
        $this->assertEquals('13', $results);

        $results = XML::getSkill($string, 'religion');
        $this->assertEquals('13', $results);
    }

    /** @test */
    public function it_parses_type()
    {
        $string = 'humanoid (mongrelfolk), curse of strahd';

        $results = XML::getType($string);
        $this->assertEquals('humanoid', $results);
    }

    /** @test */
    public function it_parses_subtype()
    {
        $string = 'humanoid (mongrelfolk), curse of strahd';

        $results = XML::getSubType($string);
        $this->assertEquals('mongrelfolk', $results);
    }

    /** @test */
    public function it_parses_attack_bonus()
    {
        $string = '|9|1d8+4+4d6';
        $results = XML::getAttackBonus($string);
        $this->assertEquals('9', $results);
    }

    /** @test */
    public function it_parses_damage_dice()
    {
        $string = '|9|1d8+4+4d6';
        $results = XML::getDamageDice($string);
        $this->assertEquals('1d8+4+4d6', $results);
    }

    private function expectedStatBlockAsArray()
    {
        return [
            [
                'name'                   => 'Strahd von Zarovich',
                'type'                   => 'undead',
                'subtype'                => 'shapechanger',
                'armor_class'            => '16',
                'armor_description'      => 'natural armor',
                'stat_block_type'        => 'monster',
                'hit_points'             => '144',
                'hit_dice'               => '17d8+68',
                'cr'                     => '15',
                'strength'               => '18',
                'dexterity'              => '18',
                'constitution'           => '18',
                'intelligence'           => '20',
                'wisdom'                 => '15',
                'charisma'               => '18',
                'size'                   => 'medium',
                'alignment'              => 'lawful evil',
                'speed'                  => [
                    ['value' => '30 ft.'],
                ],
                'senses'                 => [
                    ['value' => 'darkvision 120 ft.'],
                ],
                'damage_vulnerabilities' => [],
                'damage_resistances'     => [
                    ['value' => 'necrotic'],
                    ['value' => 'bludgeoning, piercing, and slashing from nonmagical attacks'],
                ],
                'damage_immunities'      => [],
                'condition_immunities'   => [],
                'languages'              => [
                    ['value' => 'Abyssal'],
                    ['value' => 'Common'],
                    ['value' => 'Draconic'],
                    ['value' => 'Elvish'],
                    ['value' => 'Giant'],
                    ['value' => 'Infernal'],
                ],
                'saves'                  => [
                    [
                        'name'  => 'dexterity',
                        'value' => '9',
                    ],
                    [
                        'name'  => 'wisdom',
                        'value' => '7',
                    ],
                    [
                        'name'  => 'charisma',
                        'value' => '9',
                    ],
                ],
                'skills'                 => [
                    [
                        'name'  => 'arcana',
                        'value' => '15',
                    ],
                    [
                        'name'  => 'perception',
                        'value' => '12',
                    ],
                    [
                        'name'  => 'religion',
                        'value' => '10',
                    ],
                    [
                        'name'  => 'stealth',
                        'value' => '14',
                    ],
                ],
                'traits'                 => [
                    [
                        'name'        => 'Shapechanger',
                        'description' => "If Strahd isn't in running water or sunlight, he can use his action to polymorph into a Tiny bat, a Medium wolf, or a Medium cloud of mist, or back into his true form.\n\n\tWhile in bat or wolf form, Strahd can't speak. In bat form, his walking speed is 5 feet, and he has a flying speed of 30 feet. In wolf form, his walking speed is 40 feet. His statistics, other than his size and speed, are unchanged. Anything he is wearing transforms with him, but nothing he is carrying does. He reverts to his true form if he dies.\n\n\tWhile in mist form, Strahd can't take any actions, speak, or manipulate objects. He is weightless, has a flying speed of 30 feet, can hover, and can enter a hostile creature's space and stop there. In addition, if air can pass through a space, the mist can do so without squeezing, and he can't pass through water. He has advantage on Strength, Dexterity, and Constitution saving throws, and it is immune to all nonmagical damage, except the damage he takes from sunlight."
                    ],
                    [
                        'name'        => 'Legendary Resistance (3/Day)',
                        'description' => "If Strahd fails a saving throw, he can choose to succeed instead."
                    ],
                    [
                        'name'        => 'Misty Escape',
                        'description' => "When he drops to 0 hit points outside his coffin, Strahd transforms into a cloud of mist (as in the Shapechanger trait) instead of falling unconscious, provided that he isn't in running water or sunlight. If he can't transform, he is destroyed.\n\n\tWhile he has 0 hit points in mist form, he can't revert to his vampire form, and he must reach his coffin within 2 hours or be destroyed. Once in his coffin, he reverts to his vampire form. He is then paralyzed until he regains at least 1 hit point. After spending 1 hour in his coffin with 0 hit points, he regains 1 hit point."
                    ],
                    [
                        'name'        => 'Regeneration',
                        'description' => "Strahd regains 20 hit points at the start of his turn if he has at least 1 hit point and isn't in running water or sunlight. If he takes radiant damage or damage from holy water, this trait doesn't function at the start of his next turn."
                    ],
                    [
                        'name'        => 'Spellcasting',
                        'description' => "Strahd is a 9th-level spellcaster. His spellcasting ability is Intelligence (spell save DC 18, +10 to hit with spell attacks). Strahd has the following wizard spells prepared:\n\n• Cantrips (at will): mage hand, prestidigitation, ray of frost\n\n•1st level (4 slots): comprehend languages, fog cloud, sleep\n\n•2nd level (3 slots): detect thoughts, gust of wind, mirror image\n\n•3rd level (3 slots): animate dead, fireball, nondetection\n\n•4th level (3 slots): blight, greater invisibility, polymorph\n\n•5th level (1 slot): animate objects, scrying"
                    ],
                    [
                        'name'        => 'Spider Climb',
                        'description' => "Strahd can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
                    ],
                    [
                        'name'        => 'Vampire Weaknesses',
                        'description' => "Strahd has the following flaws. \n\n\tForbiddance: He can't enter a residence without an invitation from one of the occupants.\n\n\tHarmed by Running Water: He takes 20 acid damage if he ends his turn in running water.\n\n\tStake to the Heart: If a piercing weapon made of wood is driven into his heart while he is incapacitated in his coffin, he is paralyzed until the stake is removed.\n\n\tSunlight Hypersensitivity: While in sunlight, Strahd takes 20 radiant damage at the start of his turn, and he has disadvantage on attack rolls and ability checks."
                    ]
                ],
                'actions'                => [
                    [
                        "name"        => "Multiattack (Vampire Form Only)",
                        "description" => "Strahd makes two attacks, only one of which can be a bite attack."
                    ],
                    [
                        "name"        => "Unarmed Strike (Vampire Form Only)",
                        "description" => "Melee Weapon Attack: +9 to hit, reach 5 ft., one creature. Hit: 8 (1d8+4) bludgeoning damage, plus 14 (4d6) necrotic damage. If the target is a creature, Strahd can grapple it (escape DC 18) instead of dealing the bludgeoning damage."
                    ],
                    [
                        "name"        => "Bite (Bat or Vampire Form Only)",
                        "description" => "Melee Weapon Attack: +9 to hit, reach 5 ft., one willing creature, or a creature that is grappled by Strahd, incapacitated, or restrained. Hit: 7 (1d6+4) piercing damage plus 10 (3d6) necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken, and Strahd regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if  its hit point maximum is reduced to 0. A humanoid slain in this way and then buried in the ground rises the following night as a vampire spawn under Strahd's control."
                    ],
                    [
                        "name"        => "Charm",
                        "description" => "Strahd targets one humanoid he can see within 30 ft. of him. If the target can see Strahd, the target must succeed on a DC 17 Wisdom saving throw against this magic or be charmed. The charmed target regards Strahd as a trusted friend to be heeded and protected. The target isn't under Strahd's control, but it takes Strahd's requests and actions in the most favorable way and lets Strahd bite it.\n\n\tEach time Strahd or his companions do anything harmful to the target, it can repeat the saving throw, ending the effect on itself on a success. Otherwise, the effect lasts 24 hours or until Strahd is destroyed, is on a different plane of existence than the target, or takes a bonus action to end the effect."
                    ],
                    [
                        "name"        => "Children of the Night (1/day)",
                        "description" => "Strahd magically calls 2d4 swarms of bats or swarms rats, provided that the sun isn't up. While outdoors, Strahd can call 3d6 wolves instead. The called creatures arrive in 1d4 rounds, acting as allies of Strahd and obeying his spoken commands. The beasts remain for 1 hour, until Strahd dies, or until he dismisses them as a bonus action."
                    ]
                ],
                'reactions'              => [],
                'legendary_actions'      => [
                    [
                        'name'        => null,
                        'description' => "Strahd can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time, and only at the end of another creature's turn. Strahd regains spent legendary actions at the start of his turn."
                    ],
                    [
                        'name'        => "Move",
                        'description' => "Strahd moves up to his speed without provoking opportunity attacks."
                    ],
                    [
                        'name'        => "Unarmed Strike",
                        'description' => "Strahd makes one unarmed strike."
                    ],
                    [
                        'name'        => "Bite (Costs 2 Actions)",
                        'description' => "Strahd makes one bite attack."
                    ]
                ],
                'legendary_description'  => null,
                'collection'             => 'Curse of Strahd'
            ]
        ];
    }
}
