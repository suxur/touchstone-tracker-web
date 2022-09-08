<?php

namespace App\Http\Controllers\Api;

use App\Codex\CodexManager;
use App\Http\Controllers\Controller;
use App\Http\Resources\CodexCharacterResource;
use App\Http\Resources\CodexEncounterResource;
use App\Http\Resources\CodexMonsterResource;
use App\Http\Resources\CodexSpellResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CodexController extends Controller
{
    private CodexManager $manager;

    public function __construct(CodexManager $manager)
    {
        $this->manager = $manager;
    }

    public function monsters(): AnonymousResourceCollection
    {
        return CodexMonsterResource::collection($this->manager->monsters());
   }

    public function characters(): AnonymousResourceCollection
    {
        return CodexCharacterResource::collection($this->manager->characters());
    }

    public function spells(): AnonymousResourceCollection
    {
        return CodexSpellResource::collection($this->manager->spells());
    }

    public function encounters(): AnonymousResourceCollection
    {
        return CodexEncounterResource::collection($this->manager->encounters());
    }
}
