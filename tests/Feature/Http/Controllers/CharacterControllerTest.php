<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_should_redirect_to_login_if_unauthenticated()
    {
        $response = $this->get('/characters');
        $response->assertStatus(302);
        $response->assertLocation('/login');
    }

    /** @test */
    public function it_should_get_index_if_authenticated()
    {
        $this->signIn();

        $response = $this->get('/characters');
        $response->assertStatus(200);
    }
}