<?php

namespace App\Http\Controllers\Api;

use App\Models\StatBlock;
use App\Http\Controllers\Controller;

class MonsterController extends Controller
{
    public function preloaded()
    {
        $preloaded = StatBlock::preloadedMonsters()->paginate(10);

        return response()->json($preloaded);
    }
}
