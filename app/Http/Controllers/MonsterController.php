<?php

namespace App\Http\Controllers;

use App\Actions\Jetstream\RemoveStatBlock;
use App\Actions\Jetstream\UpdateMonster;
use App\Actions\StatBlock\CreateStatBlock;
use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use function app;
use function back;

class MonsterController extends Controller
{
    public const SIZE = [
        'T' => 'tiny',
        'S' => 'small',
        'M' => 'medium',
        'L' => 'large',
        'H' => 'huge',
        'G' => 'gargantuan'
    ];

    /**
     * Show the general profile settings screen.
     *
     * @return Response
     */
    public function index(): Response
    {
        /** @var User $user */
        $user = auth()->user();

        $monsters = $user->monsters()->sortBy('name');

        return Inertia::render('Monsters/Index', [
            'monsters'    => $monsters->values(),
            'collections' => $monsters->collections(),
            'preloaded'   => StatBlock::where('user_id', null)->monsters()->paginate(10),
            'permissions' => [
                'canManageStatBlocks' => true,
            ],
        ]);
    }

    public function preloaded()
    {
        $preloaded = StatBlock::where('user_id', null)->monsters()->paginate(10);

        return response()->json($preloaded);
    }

    /**
     * Create a new monster.
     *
     * @param Request $request
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        app(CreateStatBlock::class)->create($request->user(), $request->all());
        return back(303);
    }

    /**
     * Update a monster.
     *
     * @param Request $request
     * @param StatBlock $monster
     * @return RedirectResponse
     * @throws ValidationException|AuthorizationException
     */
    public function update(Request $request, StatBlock $monster): RedirectResponse
    {
        $creator = app(UpdateMonster::class);

        $creator->update($request->user(), $monster, $request->all());

        return back(303);
    }

    /**
     * Remove the given monster.
     *
     * @param Request $request
     * @param StatBlock $monster
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function destroy(Request $request, StatBlock $monster): RedirectResponse
    {
        app(RemoveStatBlock::class)->remove($request->user(), $monster);

        return back(303);
    }

    public function monster(StatBlock $monster): JsonResponse
    {
        $monster->setAppends([
            'experience_points',
            'initiative',
            'strength_modifier',
            'dexterity_modifier',
            'constitution_modifier',
            'intelligence_modifier',
            'wisdom_modifier',
            'charisma_modifier',
        ]);

        return response()->json($monster);
    }

    public function import(Request $request)
    {
        $type = $request->get('type');
        $collection = $request->get('group');
        if ($path = optional($request->file('file'))->getRealPath()) {
            switch ($type) {
                case 'dndappfile':
                    $this->importXml($path, $collection);
                    break;
                case 'json':
                    break;
            }
        }

        return $request->wantsJson() ? new JsonResponse('', 200) : back()->with('status', 'monster-import-success');
    }

}
