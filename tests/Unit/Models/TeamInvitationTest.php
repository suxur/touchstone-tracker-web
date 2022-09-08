<?php

namespace Tests\Unit\Models;

use App\Models\TeamInvitation;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamInvitationTest extends ModelTestCase
{
    protected ?string $table = 'team_invitations';
    protected array $columns = [
        'id',
        'team_id',
        'email',
        'role',
        'created_at',
        'updated_at',
    ];

    /** @test */
    public function a_team_invitation_belongs_to_a_team(): void
    {
        $teamInvitation = TeamInvitation::factory()->create();

        $this->assertInstanceOf(BelongsTo::class, $teamInvitation->team());
    }
}
