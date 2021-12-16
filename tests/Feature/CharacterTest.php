<?php

namespace Tests\Feature;

use App\Models\Character;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CharacterTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_create_characters(): void
    {
        $this->withoutExceptionHandling();

        $attributes = Character::factory()->raw();
        $attributes['saves'] = [];
        $attributes['skills'] = [];
        $attributes['traits'] = [];
        $attributes['actions'] = [];
        $attributes['reactions'] = [];

        $response = $this->post('/characters', $attributes);
        $response->assertStatus(303);

        $this->assertDatabaseHas('characters', ['name' => $attributes['name']]);
    }

    /** @test */
    public function a_character_requires_a_name(): void
    {
        $attributes = Character::factory()->raw(['name' => '']);
        $this->post('/characters', $attributes)->assertSessionHasErrors('name');
    }
}
