<?php

namespace Tests\Unit\Models;

use App\Models\Encounter;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserTest extends ModelTestCase
{
    protected ?string $table = 'users';
    protected array $columns = [
        'id',
        'name',
        'email',
        'email_verified_at',
        'password',
        'remember_token',
        'current_team_id',
        'profile_photo_path',
        'created_at',
        'updated_at',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'stripe_id',
        'pm_type',
        'pm_last_four',
        'trial_ends_at',
    ];

    /** @test */
    public function a_user_has_many_encounters(): void
    {
        $user = User::factory()->create();
        Encounter::factory()->create([
            'user_id' => $user->id
        ]);

        $this->assertInstanceOf(Collection::class, $user->encounters);
    }
}
