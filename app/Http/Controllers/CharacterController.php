<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CharacterController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Characters/Index', [
            'permissions' => [
                'canManageStatBlocks' => true,
            ],
        ]);
    }
}
