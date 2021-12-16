<?php

namespace App\Http\Controllers;

use App\Actions\Jetstream\CreateCharacter;
use App\Actions\Jetstream\RemoveCharacter;
use App\Actions\Jetstream\UpdateCharacter;
use App\Models\Character;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Jetstream\RedirectsActions;
use function app;
use function auth;
use function back;
use function response;

class CharacterController extends Controller
{
    use RedirectsActions;

    public function index(): Response
    {
        /** @var User $user */
        $user = auth()->user();

        $characters = $user->characters->each->setAppends([
            'initiative',
            'speed_array',
            'senses_array',
            'damage_vulnerabilities_array',
            'damage_resistances_array',
            'damage_immunities_array',
            'condition_immunities_array',
            'languages_array',
            'skills_array',
            'saves_array'
        ])->sortBy('name')->values();

        return Inertia::render('Characters/Index', [
            'characters' => $characters,
            'permissions'          => [
                'canManageCharacters'  => true,
            ],
        ]);
    }

    /**
     * Create a new character.
     *
     * @param Request $request
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $creator = app(CreateCharacter::class);

        $creator->create($request->user(), $request->all());

        return back(303);
    }

    /**
     * Update a character.
     *
     * @param Request   $request
     * @param Character $character
     * @return RedirectResponse
     * @throws ValidationException|AuthorizationException
     */
    public function update(Request $request, Character $character): RedirectResponse
    {
        $creator = app(UpdateCharacter::class);

        $creator->update($request->user(), $character, $request->all());

        return back(303);
    }

    /**
     * Remove the given character.
     *
     * @param Request   $request
     * @param Character $character
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function destroy(Request $request, Character $character): RedirectResponse
    {
        app(RemoveCharacter::class)->remove($request->user(), $character);

        return back(303);
    }

    public function character(Character $character): JsonResponse
    {
        $character->setAppends([
            'experience_points',
            'initiative',
            'strength_modifier',
            'dexterity_modifier',
            'constitution_modifier',
            'intelligence_modifier',
            'wisdom_modifier',
            'charisma_modifier',
        ]);

        return response()->json($character);
    }

    public function duplicate(Character $character): RedirectResponse
    {
        $duplicate = $character->replicate();
        $duplicate->name .= ' (Copy)';
        $duplicate->save();

        return back(303);
    }

    /**
     * @throws AuthorizationException
     */
    public function claim(Character $character): RedirectResponse
    {
        $this->authorize('claim', $character);

        /** @var User $user */
        $user = auth()->user();

        $character->user_id = $user->id;
        $character->save();

        return back(303);
    }
}
