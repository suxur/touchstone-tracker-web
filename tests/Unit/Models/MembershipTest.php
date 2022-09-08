<?php

namespace Tests\Unit\Models;

class MembershipTest extends ModelTestCase
{
    protected ?string $table = 'team_user';
    protected array $columns = [
        'id',
        'team_id',
        'user_id',
        'role',
        'created_at',
        'updated_at',
    ];
}
