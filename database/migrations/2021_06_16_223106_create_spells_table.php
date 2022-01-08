<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpellsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('spells', static function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('higher_level')->nullable();
            $table->string('page')->nullable();
            $table->string('range')->nullable();
            $table->string('components')->nullable();
            $table->text('material')->nullable();
            $table->string('duration')->nullable();
            $table->string('casting_time')->nullable();
            $table->string('level')->nullable();
            $table->integer('level_int')->default(1);
            $table->string('school')->nullable();
            $table->string('class')->nullable();
            $table->string('archetype')->nullable();
            $table->string('circles')->nullable();
            $table->string('domains')->nullable();
            $table->string('oaths')->nullable();
            $table->string('patrons')->nullable();
            $table->boolean('is_ritual')->default(false);
            $table->boolean('requires_concentration')->default(false);
            $table->timestamps();
        });

        Schema::create('spell_stat_block', static function (Blueprint $table) {
            $table->foreignId('spell_id')->constrained();
            $table->foreignId('stat_block_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('spells');
    }
}
