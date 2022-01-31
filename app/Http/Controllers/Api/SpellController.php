<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Spell;
use Illuminate\Http\JsonResponse;
use function response;

class SpellController extends Controller
{
    public function spell(Spell $spell): JsonResponse
    {
        return response()->json($spell);
    }
}
