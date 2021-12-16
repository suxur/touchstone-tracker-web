<?php

namespace App\Http\Controllers;

use App\Models\Spell;
use Illuminate\Http\JsonResponse;

class SpellController extends Controller
{
    public function spell(Spell $spell): JsonResponse
    {
        return response()->json($spell);
    }
}
