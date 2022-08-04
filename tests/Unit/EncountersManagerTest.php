<?php

namespace Tests\Unit;

use App\Encounters\Encounters;
use Illuminate\Support\Str;
use Tests\TestCase;

class EncountersManagerTest extends TestCase
{
    /** @test */
    public function it_gets_session_or_last_encounter_slug(): void
    {

    }

    /** @test */
    public function it_parses_a_url_for_a_slug(): void
    {
        $slug = Str::random(8);
        $url = 'https://touchstone.test/p/' . $slug;

        $encounterSlug = Encounters::lookup($url);

        self::assertEquals($slug, $encounterSlug);

        $encounterSlug = Encounters::lookup($slug);
        self::assertEquals($slug, $encounterSlug);
    }

    /** @test */
    public function it_returns_slug_if_not_url(): void
    {
        $slug = Str::random(8);
        $encounterSlug = Encounters::lookup($slug);

        self::assertEquals($slug, $encounterSlug);
    }
}
