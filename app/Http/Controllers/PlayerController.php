<?php

namespace App\Http\Controllers;

use App\Models\Encounter;
use Inertia\Inertia;
use Inertia\Response;

class PlayerController extends Controller
{
    public function show($slug): Response
    {
        return Inertia::render('Player/Show', [
            'encounter' => Encounter::where(['slug' => $slug])->firstOrFail(),
        ]);
    }
}
