<?php

namespace App\Http\Controllers;

use App\Actions\Jetstream\RemoveStatBlock;
use App\Actions\Jetstream\UpdateCharacter;
use App\Actions\StatBlock\CreateStatBlock;
use App\Models\StatBlock;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use function app;
use function auth;
use function back;

class CharacterController extends Controller
{
    public function index(): Response
    {
        /** @var User $user */
        $user = auth()->user();

        return Inertia::render('Characters/Index', [
            'characters'  => $user->characters()->sortBy('name')->values(),
            'permissions' => [
                'canManageStatBlocks' => true,
            ],
        ]);
    }

    /**
     * Create a new character
     *
     * @param Request $request
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $creator = app(CreateStatBlock::class);

        $creator->create($request->user(), $request->all());

        return back(303);
    }

    /**
     * Update a character
     *
     * @param Request $request
     * @param StatBlock $character
     * @return RedirectResponse
     * @throws ValidationException|AuthorizationException
     */
    public function update(Request $request, StatBlock $character): RedirectResponse
    {
        $creator = app(UpdateCharacter::class);

        $creator->update($request->user(), $character, $request->all());

        return back(303);
    }

    /**
     * Remove the given character.
     *
     * @param Request $request
     * @param StatBlock $character
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function destroy(Request $request, StatBlock $character): RedirectResponse
    {
        app(RemoveStatBlock::class)->remove($request->user(), $character);

        return back(303);
    }

    /**
     * Allows a user to claim a Team's character
     * as their own.
     *
     * @throws AuthorizationException
     */
    public function claim(StatBlock $character): RedirectResponse
    {
        $this->authorize('claim', $character);

        /** @var User $user */
        $user = auth()->user();

        $character->user_id = $user->id;
        $character->save();

        return back(303);
    }

    /**
     * Duplicates the given character.
     *
     * @param StatBlock $character
     * @return RedirectResponse
     */
    public function duplicate(StatBlock $character): RedirectResponse
    {
        $duplicate = $character->replicate();
        $duplicate->name .= ' (Copy)';
        $duplicate->save();

        return back(303);
    }
}
