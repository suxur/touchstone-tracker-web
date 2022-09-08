<?php

namespace App\Collections;

use Illuminate\Database\Eloquent\Collection;

class StatBlockCollection extends Collection
{
    public function collections(): \Illuminate\Support\Collection
    {
        return $this->where('collection', '!=', '')->groupBy('collection')->keys();
    }
}
