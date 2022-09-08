<?php

namespace App\Encounters;

use App\Models\Encounter;
use Str;

class EncountersManager
{
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
