<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->char('alpha1', 2);
            $table->char('alpha2', 3);
            $table->char('top_level_domain');
            $table->integer('calling_code');
            $table->string('capital', 100);
            $table->string('region', 100);
            $table->string('currency_name', 100);
            $table->char('currency_code', 5);
            $table->char('currency_symbol', 5);
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
        Schema::dropIfExists('countries');
    }
}
