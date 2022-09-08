<?php

namespace App\Http\Controllers;

use App\Encounters\Encounters;
use App\Http\Resources\EncounterResource;
use App\Models\Encounter;
use Inertia\Response;
use function auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use function redirect;
use function session;

class EncounterController extends Controller
{
    public function index()
    {
        $slug = session('encounter_slug');

        if (!$slug) {
            $slug = Str::random(8);
            session(['encounter_slug' => $slug]);
        }

        $encounter = Encounter::firstOrCreate([
            'slug' => $slug,
        ]);

        session(['encounter_slug' => $encounter->slug]);

        if (auth()->check()) {
            return redirect()->route('e.show', ['e' => $slug]);
        }

        return Inertia::render(
            'Encounter',
            [
                'encounter' => new EncounterResource($encounter),
            ],
        );
    }

    public function store(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'lookup' => 'required|string',
        ], [
            'lookup.required' => 'Please enter an Encounter ID or URL.',
        ]);

        $validator->after(function ($validator) use ($request) {
            if ($lookup = $request->get('lookup')) {
                $slug = Encounters::lookup($lookup);
                if (!Encounter::whereSlug($slug)->first()) {
                    $validator->errors()->add(
                        'lookup',
                        'Unable to find encounter',
                    );
                }
            }
        })->validate();

        return redirect()->route('player.show', ['slug' => $request->get('lookup')]);
    }

    public function show($slug): Response
    {
        $encounter = Encounter::whereSlug($slug)->firstOrFail();

        $this->authorize('update', $encounter);

        if (null === $encounter->user_id) {
            $encounter->user_id = auth()->id();
            session()->remove('encounter_slug');
            $encounter->save();
        }

        session(['encounter_slug' => $encounter->slug]);

        return Inertia::render('Encounter', [
            'encounter' => $encounter,
        ]);
    }
}
