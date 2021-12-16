<?php

namespace Tests\Unit\Models;

use App\Models\Character;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class CharacterTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function a_character_can_belong_to_a_team(): void
    {
        $character = Character::factory()->create();

        $this->assertInstanceOf(BelongsTo::class, $character->team());
    }
}
