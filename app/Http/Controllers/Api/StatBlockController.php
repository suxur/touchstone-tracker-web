<?php

namespace App\Http\Controllers\Api;

use App\Actions\StatBlock\CreateStatBlock;
use App\Http\Controllers\Controller;
use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use function app;

class StatBlockController extends Controller
{
    public function monsters(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        $statBlocks = $user->monsters()->sortBy('name');

        return response()->json($statBlocks->values());
    }

    public function characters(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        $statBlocks = $user->characters()->sortBy('name');

        return response()->json($statBlocks->values());
    }

    public function show(StatBlock $statBlock): JsonResponse
    {
        return response()->json($statBlock);
    }

    /* @throws ValidationException */
    public function store(Request $request): JsonResponse
    {
        $statBlock = app(CreateStatBlock::class)->create($request->user(), $request->all());

        return response()->json($statBlock);
    }
}