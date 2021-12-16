<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spell extends Model
{
    use HasFactory;

    protected $casts = [
        'is_ritual'              => 'boolean',
        'requires_concentration' => 'boolean',
    ];
}
