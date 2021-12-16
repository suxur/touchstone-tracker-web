<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEncountersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('encounters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->string('slug');
            $table->integer('round')->default(1);
            $table->integer('monster_hp_status')->default(-1);
            $table->integer('character_hp_status')->default(-1);
            $table->boolean('hide_monsters_while_not_active')->default(1);
            $table->timestamp('started_at')->nullable();
            $table->timestamps();
        });

        Schema::create('combatants', function (Blueprint $table) {
            $table->foreignId('encounter_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('combatant_id');
            $table->string('combatant_type');
            $table->string('unique_id');
            $table->string('unique_name');
            $table->integer('hit_points');
            $table->integer('initiative');
            $table->boolean('action')->default(false);
            $table->boolean('bonus_action')->default(false);
            $table->boolean('reaction')->default(false);
            $table->boolean('extra_action')->default(false);
            $table->boolean('is_hidden')->default(false);
            $table->unsignedInteger('order');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('encounters');
        Schema::dropIfExists('combatants');
    }
}
