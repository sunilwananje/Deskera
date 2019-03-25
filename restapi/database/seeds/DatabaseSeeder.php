<?php

use Illuminate\Database\Seeder;

use App\Models\Feature;
use App\Models\Testimonial;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       if ($this->command->confirm('Do you wish to refresh migration before seeding, Make sure it will clear all old data?')) {
                $this->command->call('migrate:refresh');
                $this->command->warn("Data deleted, starting from fresh database.");
        }

        $this->command->info('Adding test data for features and testimonial...');

        factory(Feature::class, 30)->create();
        factory(Testimonial::class, 5)->create();
    }
}
