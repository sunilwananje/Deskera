<?php

use App\Models\Feature;
use App\Models\Testimonial;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/
$factory->define(App\Models\Testimonial::class, function (Faker $faker) {
    $orgNames = ['SkyNet Inc', 'SoftBee', 'OsCorp Tech'];
    return [
        'name' => $faker->name,
        'organization_name' => $faker->randomElement($orgNames),
        'quote' => $faker->sentence(5)
    ];
});

$factory->define(App\Models\Feature::class, function (Faker $faker) {
    $countries = ['RU', 'IN', 'US', 'CA'];
    $categories = ['business', 'city', 'technics'];
    return [
        'title' => $faker->sentence(1),
        'sub_title' => $faker->sentence(2),
        'description' => $faker->paragraph(3),
        'image' => $faker->image('public/storage/images', 400, 300, $categories[array_rand($categories)], false),
        'country' => $faker->randomElement($countries),
    ];
});
