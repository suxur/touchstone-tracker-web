<?php

namespace App\Http\Controllers\Api;

use App\Models\StatBlock;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class PreloadedMonsterController extends Controller
{
    public function index(): JsonResponse
    {
        $preloaded = StatBlock::preloadedMonsters()->paginate(10);

        return response()->json($preloaded);
    }
}
