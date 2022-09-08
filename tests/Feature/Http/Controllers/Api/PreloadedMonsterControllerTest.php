<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PreloadedMonsterControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_access_index()
    {
        $response = $this->get('/api/preloaded-monsters');
        $response->assertOk();
    }
}
