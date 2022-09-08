<?php

namespace Tests\Unit\Models;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class ModelTestCase extends TestCase
{
    protected ?string $table = null;
    protected array $columns = [];

    use DatabaseMigrations;

    /** @test */
    public function table_has_expected_columns()
    {
        if ($this->table === null) return;

        foreach ($this->columns as $column) {
            $this->assertTrue(
                Schema::hasColumn(
                    $this->table, $column
                ),
                "Failed asserting that column '{$column}' exists in '{$this->table}' table."
            );
        }

        $this->assertEquals($this->columns, Schema::getColumnListing($this->table));
    }
}