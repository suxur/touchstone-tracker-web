<?php

namespace App\Http\Controllers\Api;

use function app;
use App\Actions\StatBlock\CreateStatBlock;
use App\Actions\StatBlock\UpdateStatBlock;
use App\Http\Controllers\Controller;
use App\Http\Resources\StatBlockResource;
use App\Models\StatBlock;
use App\Models\User;
use Facades\App\Import\XML;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StatBlockController extends Controller
{
    public function monsters(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        $statBlocks = $user->monsters()->orderBy('name')->paginate(10);

        return response()->json($statBlocks);
    }

    public function characters(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        $statBlocks = $user->characters()->orderBy('name')->paginate(10);

        return response()->json($statBlocks);
    }

    public function show(StatBlock $statBlock): StatBlockResource
    {
        return new StatBlockResource($statBlock);
    }

    public function store(Request $request): JsonResponse
    {
        $statBlock = app(CreateStatBlock::class)->create($request->all());

        return response()->json($statBlock);
    }

    public function update(Request $request, StatBlock $statBlock)
    {
        $statBlock = app(UpdateStatBlock::class)->update($request->user(), $statBlock, $request->all());

        return response()->json($statBlock);
    }

    public function destroy(Request $request, StatBlock $statBlock): JsonResponse
    {
        app(RemoveStatBlock::class)->remove($request->user(), $statBlock);

        return response()->json(true);
    }


    public function duplicate(StatBlock $statBlock): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        $duplicate = $statBlock->replicate();
        $duplicate->name .= ' (Copy)';
        $duplicate->user_id = $user->id;
        $duplicate->team_id = $user->current_team_id;
        $duplicate->save();

        return response()->json($duplicate);
    }

    public function claim(StatBlock $statBlock): JsonResponse
    {
        $this->authorize('claim', $statBlock);

        /** @var User $user */
        $user = auth()->user();

        $statBlock->user_id = $user->id;
        $statBlock->save();

        return response()->json(true);
    }

    public function import(Request $request)
    {
        /* $type = $request->get('type'); */
        $collection = $request->get('collection');
        if ($path = optional($request->file('file'))->getRealPath()) {
            /* switch ($type) { */
            /*     case 'dndappfile': */
            $parsed = XML::parse($path, $collection);
            foreach ($parsed as $item) {
                $statBlock = app(CreateStatBlock::class)->create($request->user(), $item);
            }
            /* break; */
                /* case 'json': */
                    /* break; */
        }

        return $request->wantsJson() ? new JsonResponse('', 200) : back()->with('status', 'monster-import-success');
    }
}
