<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeathSaveFailureToCombatantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('combatants', static function (Blueprint $table) {
            $table->integer('death_save_failure')->default(0)->after('death_save_success');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('combatants', static function (Blueprint $table) {
            $table->dropColumn('death_save_failure');
        });
    }
}
