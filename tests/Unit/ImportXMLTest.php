<?php

namespace Tests\Unit;

use Facades\App\Import\XML;
use Tests\TestCase;

class ImportXMLTest extends TestCase
{
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
}

