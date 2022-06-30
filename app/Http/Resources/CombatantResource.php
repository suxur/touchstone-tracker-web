<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CombatantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id'                   => $this->id,
            'encounter_id'         => $this->encounter->id,
            'name'                 => $this->name,
            'type'                 => $this->type,
            'stat_block'           => $this->statBlock,
            'hit_point_maximum'    => $this->hit_point_maximum,
            'current_hit_points'   => $this->current_hit_points,
            'temporary_hit_points' => $this->temporary_hit_points,
            'initiative'           => $this->initiative,
            'armor_class'          => $this->armor_class,
            'action'               => $this->action,
            'bonus_action'         => $this->bonus_action,
            'reaction'             => $this->reaction,
            'status'               => $this->status,
            'death_save_success'   => $this->death_save_success,
            'death_save_failure'   => $this->death_save_failure,
            'is_hidden'            => $this->is_hidden,
            'order'                => $this->order,
            'conditions'           => $this->conditions,
        ];
    }
}
