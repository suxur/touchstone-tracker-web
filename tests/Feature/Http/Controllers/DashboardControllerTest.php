<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function an_unauthenticated_user_should_be_redirected_to_login()
    {
        $response = $this->get('/dashboard');

        $response->assertStatus(302);
        $response->assertRedirect('/login');
    }

    /** @test */
    public function an_authenticated_user_should_be_redirected_to_encounter()
    {
        $this->signIn();

        $response = $this->get('/dashboard');

        $response->assertStatus(302);
        $response->assertRedirect('/e');
    }
}
