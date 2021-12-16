<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeathSaveSuccessToCombatantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('combatants', static function (Blueprint $table) {
            $table->integer('death_save_success')->default(0)->after('extra_action');
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
            $table->dropColumn('death_save_success');
        });
    }
}
