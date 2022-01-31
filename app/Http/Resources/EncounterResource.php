<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EncounterResource extends JsonResource
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
            'id'                             => $this->id,
            'user_id'                        => $this->user_id,
            'slug'                           => $this->slug,
            'round'                          => $this->round,
            'monster_hp_status'              => $this->monster_hp_status,
            'character_hp_status'            => $this->character_hp_status,
            'hide_monsters_while_not_active' => $this->hide_monsters_while_not_active,
            'active_index'                   => $this->active_index,
            'is_active'                      => $this->is_active,
            'started_at'                     => $this->started_at,
            'created_at'                     => $this->created_at,
            'updated_at'                     => $this->updated_at,
            'combatants'                     => CombatantResource::collection($this->combatants),
        ];
    }
}
