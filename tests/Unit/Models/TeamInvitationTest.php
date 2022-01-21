<?php

namespace Tests\Unit\Models;

use App\Models\StatBlock;
use App\Models\TeamInvitation;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class TeamInvitationTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function a_team_invitation_belongs_to_a_team(): void
    {
        $teamInvitation = TeamInvitation::factory()->create();

        $this->assertInstanceOf(BelongsTo::class, $teamInvitation->team());
    }
}
