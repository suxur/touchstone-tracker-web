<?php

namespace App\Collections;

use Illuminate\Database\Eloquent\Collection;

class StatBlockCollection extends Collection
{
    public function collections()
    {
        return $this->where('collection', '!=', '')->groupBy('collection')->keys();
    }
}
