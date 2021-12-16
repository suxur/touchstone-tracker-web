<?php

namespace App\Encounters;

class EncountersManager
{
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
