<?php

namespace Tests\Unit\Models;


class ConditionTest extends ModelTestCase
{
    protected ?string $table = 'conditions';
    protected array $columns = [
        'id',
        'name',
    ];
}
