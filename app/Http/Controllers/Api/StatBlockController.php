<?php

namespace App\Http\Controllers\Api;

use App\Actions\StatBlock\CreateStatBlock;
use App\Actions\StatBlock\UpdateStatBlock;
use App\Http\Controllers\Controller;
use Facades\App\Import\XML;
use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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

    /* @throws ValidationException */
    public function update(Request $request, StatBlock $statBlock)
    {
        $statBlock = app(UpdateStatBlock::class)->update($request->user(), $statBlock, $request->all());

        return response()->json($statBlock);
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
