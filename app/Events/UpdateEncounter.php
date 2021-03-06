<?php

namespace App\Events;

use App\Models\Encounter;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UpdateEncounter implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Encounter $encounter;

    /**
     * Create a new event instance.
     *
     * @param Encounter $encounter
     */
    public function __construct(Encounter $encounter)
    {
        $this->encounter = $encounter;
        $this->dontBroadcastToCurrentUser();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel
     */
    public function broadcastOn(): Channel
    {
        return new Channel($this->encounter->slug);
    }
}
