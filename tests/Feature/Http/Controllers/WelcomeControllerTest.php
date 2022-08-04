<?php

namespace Tests\Feature\Http\Controllers;

use Tests\TestCase;

class WelcomeControllerTest extends TestCase
{
    /** @test */
    public function it_should_get_index()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
