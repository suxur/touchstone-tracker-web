<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCombatantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('combatants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('encounter_id')->constrained()->onDelete('cascade');
            $table->foreignId('stat_block_id')->nullable();
            $table->string('name');
            $table->string('type');
            $table->integer('hit_point_maximum')->default(0);
            $table->integer('current_hit_points')->default(0);
            $table->integer('temporary_hit_points')->default(0);
            $table->integer('armor_class')->default(0);
            $table->integer('initiative')->default(0);
            $table->boolean('action')->default(false);
            $table->boolean('bonus_action')->default(false);
            $table->boolean('reaction')->default(false);
            $table->integer('death_save_success')->default(0);
            $table->integer('death_save_failure')->default(0);
            $table->boolean('is_hidden')->default(false);
            $table->unsignedInteger('order');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('combatants');
    }
}
