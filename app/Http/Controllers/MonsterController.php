<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class MonsterController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Monsters/Index', [
            'permissions' => [
                'canManageStatBlocks' => true,
            ],
        ]);
    }

}
