<?php

namespace App\Encounters;

use App\Models\Encounter;
use Str;

class EncountersManager
{
    public function latest(): Encounter
    {
        if ($userId = auth()->user()->id) {
            $encounter = Encounter::where('user_id', '=', $userId)->latest()->first();
        }

        if ($encounter) {
            return $encounter;
        }

        return Encounter::firstOrCreate([
            'slug' => $this->slug(),
        ]);
    }

    public function slug(): string
    {
        $slug = session('encounter_slug');

        if (!$slug) {
            $slug = Str::random(8);
            session(['encounter_slug' => $slug]);
        }

        return $slug;
    }

    public function lookup($param): string
    {
        $slug = $param;
        if (filter_var($slug, FILTER_VALIDATE_URL)) {
            $parsedUrl = parse_url($slug);
            $explodedPath = explode('/', $parsedUrl['path']);
            $slug = end($explodedPath);
        }

        return $slug ?? '';
    }
}
