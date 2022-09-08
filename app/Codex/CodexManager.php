<?php

namespace App\Codex;

use App\Models\Spell;
use App\Models\StatBlock;

class CodexManager
{
    public function monsters()
    {
        $monsters = StatBlock::select(['id', 'name'])->monsters()->get();
        $userMonsters = StatBlock::select(['id', 'name'])->userMonsters()->get();

        return $monsters->merge($userMonsters)->sortBy('name');
    }

    public function characters()
    {
        return StatBlock::select(['id', 'name'])->userCharacters()->orderBy('name')->get();
    }

    public function spells()
    {
        return Spell::select(['id', 'name'])->orderBy('name')->get();
    }

    public function encounters()
    {
        return auth()->user()->encounters()->orderByDesc('created_at')->get();
    }
}