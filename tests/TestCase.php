<?php

namespace Tests;

use App\Models\Encounter;
use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function signIn(User $user = null)
    {
        /** @var User $user */
        $user = $user ?? User::factory()->withPersonalTeam()->create();
        $this->actingAs($user);

        return $user;
    }

    public function signInAndSubscribe(User $user = null)
    {
        /** @var User $user */
        $user = $user ?? User::factory([
                'stripe_id'     => 'cus_MDLjI0wQHeshD9',
                'pm_type'       => 'visa',
                'pm_last_four'  => '4242',
                'trial_ends_at' => null,
            ])->withSubscription()->create();
        $this->actingAs($user);

        return $user;
    }

    private function createEncounterWithUser(): array
    {
        /** @var User $user */
        $user = User::factory()->withEncounter()->withPersonalTeam()->create();
        /** @var Encounter $encounter */
        $encounter = $user->encounters()->first();

        return [$user, $encounter];
    }
}
