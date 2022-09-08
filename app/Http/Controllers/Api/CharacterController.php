<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class CharacterController extends Controller
{
    public function index(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        $statBlocks = $user->characters()->orderBy('name')->paginate(10);

        return response()->json($statBlocks);
    }
}
