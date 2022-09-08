<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MonsterControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function an_unauthenticated_user_cannot_access_index()
    {
        $response = $this->get('/api/monsters');
        $response->assertRedirect();
    }

    /** @test */
    public function an_authenticated_user_can_access_index()
    {
        $this->signIn();

        $response = $this->get('/api/monsters');
        $response->assertOk();
    }
}
