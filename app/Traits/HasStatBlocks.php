<?php

namespace App\Traits;

use App\Models\StatBlock;

trait HasStatBlocks
{
    public function statBlocks()
    {
        return $this->hasMany(StatBlock::class);
    }

    public function characters()
    {
        return $this->statBlocks()->where('stat_block_type', 'character');
    }

    public function monsters()
    {
        return $this->statBlocks()->where('stat_block_type', 'monster');
    }

    public function removeStatBlock(StatBlock $statBlock)
    {
        $statBlock->delete();
    }

    public function ownsStatBlock($statBlock): bool
    {
        if (is_null($statBlock)) {
            return false;
        }

        return $this->id === $statBlock->{$this->getForeignKey()};
    }
}
