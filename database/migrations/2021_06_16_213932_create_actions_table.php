<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('combatant_id');
            $table->string('combatant_type');
            $table->string('name');
            $table->text('description');
            $table->integer('attack_bonus')->default(0);
            $table->string('damage_dice')->nullable();
            $table->integer('damage_bonus')->nullable();
            $table->boolean('is_reaction')->default(false);
            $table->boolean('is_special')->default(false);
            $table->boolean('is_legendary')->default(false);
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
        Schema::dropIfExists('actions');
    }
}
