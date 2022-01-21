<?php

namespace App\Traits;

use App\Models\StatBlock;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasCharacters
{
    /**
     * Get all of the characters.
     *
     * @return HasMany
     */
    public function characters()
    {
        return $this->hasMany(StatBlock::class);
    }
}
