<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Action extends Model
{
    use HasFactory;

    protected $visible = ['id', 'name', 'description'];

    protected $casts = [
        'is_reaction'  => 'boolean',
        'is_legendary' => 'boolean',
        'is_special'   => 'boolean',
    ];

    public function statBlock(): BelongsTo
    {
        return $this->belongsTo(StatBlock::class);
    }
}
