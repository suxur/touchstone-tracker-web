<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateMonstersTableChangeGroupToCollection extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('monsters', function (Blueprint $table) {
            $table->renameColumn('group', 'collection');
        });

        DB::table('monsters')->whereNull('collection')->update(['collection' => 'Uncategorized']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('monsters', function (Blueprint $table) {
            $table->renameColumn('collection', 'group');
        });

        DB::table('monsters')->where('group', 'Uncategorized')->update(['group' => null]);
    }
}
