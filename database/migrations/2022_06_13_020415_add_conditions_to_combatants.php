<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddConditionsToCombatants extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conditions', static function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('combatant_condition', function (Blueprint $table) {
            $table->foreignId('combatant_id')->constrained();
            $table->foreignId('condition_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('combatant_condition');
        Schema::dropIfExists('conditions');
    }
}
