<?php

namespace Tests\Unit\Models;

class TeamTest extends ModelTestCase
{
    protected ?string $table = 'teams';
    protected array $columns = [
        'id',
        'user_id',
        'name',
        'personal_team',
        'created_at',
        'updated_at',
    ];
}
