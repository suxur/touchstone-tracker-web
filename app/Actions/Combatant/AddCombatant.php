<?php

namespace App\Actions\Combatant;

use App\Models\Encounter;
use App\Models\StatBlock;

class AddCombatant
{
    public function add(Encounter $encounter, StatBlock $statBlock)
    {
        $encounter->combatants()->create([
            'name'               => $statBlock->name,
            'type'               => $statBlock->stat_block_type,
            'current_hit_points' => $statBlock->hit_points,
            'hit_point_maximum'  => $statBlock->hit_points,
            'armor_class'        => $statBlock->armor_class,
            'initiative'         => $statBlock->getDexterityModifierAttribute(),
            'order'              => $encounter->combatants_count,
            'stat_block_id'      => $statBlock->id,
        ]);
    }
}
