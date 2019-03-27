<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'alpha1', 'alpha2', 'top_level_domain', 'calling_code', 'capital', 'region', 'currency_name', 'currency_code', 'currency_symbol'
    ];
}
