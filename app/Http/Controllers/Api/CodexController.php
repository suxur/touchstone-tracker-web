<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CodexCharacterResource;
use App\Http\Resources\CodexEncounterResource;
use App\Http\Resources\CodexMonsterResource;
use App\Http\Resources\CodexSpellResource;
use App\Models\Spell;
use App\Models\StatBlock;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CodexController extends Controller
{
    public function monsters(): AnonymousResourceCollection
    {
        $monsters = StatBlock::select(['id', 'name'])->monsters()->get();
        $userMonsters = StatBlock::select(['id', 'name'])->userMonsters()->get();

        return CodexMonsterResource::collection($monsters->merge($userMonsters)->sortBy('name'));
   }

    public function characters(): AnonymousResourceCollection
    {
        $characters = StatBlock::select(['id', 'name'])->userCharacters()->orderBy('name')->get();

        return CodexCharacterResource::collection($characters);
    }

    public function spells(): AnonymousResourceCollection
    {
        $spells = Spell::select(['id', 'name'])->orderBy('name')->get();

        return CodexSpellResource::collection($spells);
    }

    public function encounters(): AnonymousResourceCollection
    {
        $encounters = $this->user()->encounters()->orderByDesc('created_at')->get();

        return CodexEncounterResource::collection($encounters);
    }
}
