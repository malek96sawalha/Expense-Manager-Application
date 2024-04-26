<?php

namespace Database\Seeders;
 use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => bcrypt('password123'),
                'balance' => '1000.00',
            ],
            [
                'name' => 'Jane Doe',
                'email' => 'jane@example.com',
                'password' => bcrypt('password456'),
                'balance' => '1500.00',
            ],
            [
                'name' => 'Alice Smith',
                'email' => 'alice@example.com',
                'password' => bcrypt('password789'),
                'balance' => '2000.00',
            ],
            [
                'name' => 'Bob Johnson',
                'email' => 'bob@example.com',
                'password' => bcrypt('passwordabc'),
                'balance' => null,
            ],
        ];

        DB::table('users')->insert($users);
    }
}
