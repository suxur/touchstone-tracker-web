<?php

namespace Database\Seeders;

use App\Models\Condition;
use Illuminate\Database\Seeder;

class ConditionSeeder extends Seeder
{
    private $conditions = [
        'blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'grappled', 'incapacitated', 'invisible', 'paralyed', 'petrified', 'poisoned', 'prone', 'stunned', 'unconscious'
    ];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->conditions as $condition) {
            Condition::factory()->state([
                'name' => $condition
            ])->create();
        }
    }
}
