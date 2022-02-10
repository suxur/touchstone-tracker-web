<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatBlocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stat_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->foreignId('team_id')->nullable()->constrained();
            $table->string('session_id')->nullable();
            $table->string('name');
            $table->string('size')->nullable();
            $table->string('stat_block_type')->nullable(); // monster | character | npc
            $table->string('type')->nullable(); // type | race
            $table->string('subtype')->nullable(); // subtype | class
            $table->string('alignment')->nullable();
            $table->integer('armor_class')->default(0);
            $table->integer('hit_points')->default(0);
            $table->string('hit_dice')->nullable();
            $table->string('speed')->nullable();

            // Ability Scores
            $table->integer('strength')->default(0);
            $table->integer('dexterity')->default(0);
            $table->integer('constitution')->default(0);
            $table->integer('intelligence')->default(0);
            $table->integer('wisdom')->default(0);
            $table->integer('charisma')->default(0);

            // Saves
            $table->integer('strength_save')->nullable();
            $table->integer('dexterity_save')->nullable();
            $table->integer('constitution_save')->nullable();
            $table->integer('intelligence_save')->nullable();
            $table->integer('wisdom_save')->nullable();
            $table->integer('charisma_save')->nullable();

            // Skills
            $table->integer('acrobatics')->nullable();
            $table->integer('animal_handling')->nullable();
            $table->integer('arcana')->nullable();
            $table->integer('athletics')->nullable();
            $table->integer('deception')->nullable();
            $table->integer('history')->nullable();
            $table->integer('insight')->nullable();
            $table->integer('intimidation')->nullable();
            $table->integer('investigation')->nullable();
            $table->integer('medicine')->nullable();
            $table->integer('nature')->nullable();
            $table->integer('perception')->nullable();
            $table->integer('performance')->nullable();
            $table->integer('persuasion')->nullable();
            $table->integer('religion')->nullable();
            $table->integer('sleight_of_hand')->nullable();
            $table->integer('stealth')->nullable();
            $table->integer('survival')->nullable();

            $table->string('damage_vulnerabilities')->nullable();
            $table->string('damage_resistances')->nullable();
            $table->string('damage_immunities')->nullable();
            $table->string('condition_immunities')->nullable();
            $table->string('senses')->nullable();
            $table->string('languages')->nullable();
            $table->string('challenge_rating')->nullable();
            $table->text('legendary_description')->nullable();
            $table->json('speed_json')->nullable();
            $table->string('armor_description')->nullable();
            $table->string('collection')->nullable();
            $table->timestamps();

            $table->foreign('session_id')->references('id')->on('sessions')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stat_blocks');
    }
}
