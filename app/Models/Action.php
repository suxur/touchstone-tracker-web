<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    use HasFactory;

    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = ['id', 'name', 'description'];

    protected $casts = [
        'is_reaction'  => 'boolean',
        'is_legendary' => 'boolean',
        'is_special'   => 'boolean',
    ];

    protected $guarded = [];

    public function statBlock()
    {
        return $this->belongsTo(StatBlock::class);
    }
}
