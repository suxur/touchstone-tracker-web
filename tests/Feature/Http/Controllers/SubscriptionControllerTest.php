<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Cashier\Subscription;
use Tests\TestCase;

class SubscriptionControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_should_cancel_a_users_subscription()
    {
        $user = $this->signInAndSubscribe();

        $response = $this->post('/user/subscription/cancel');
        $response->assertOk();

        $this->assertFalse($user->subscribed('pro'));
    }
}
