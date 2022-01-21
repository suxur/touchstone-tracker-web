<?php

namespace App\Http\Controllers;

use App\Models\Encounter;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class PlayerController extends Controller
{
    public function show($slug): Response
    {
        $encounter = Encounter::where(['slug' => $slug])->firstOrFail();

        $characterIds = [];
        /** @var User $user */
        if ($user = auth()->user()) {
            $characterIds = $user->characters->pluck('id');
        }

        return Inertia::render('Player/Show', [
            'encounter' => $encounter,
        ]);
    }
}