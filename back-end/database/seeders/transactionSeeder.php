<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $transactions = [
            [
                'userId' => 1,
                'categoryId' => 1,
                'type' => 'Income',
                'sourcename' => 'Job',
                'amount' => 2000.00,
                'frequency' => 'monthly',
                'description' => 'Salary for April',
                'rest' => 3000.00,
                'balncebefore' => 1000.00,
                'transaction_date' => '2024-04-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'userId' => 1,
                'categoryId' => 3,
                'type' => 'Income',
                'sourcename' => 'Job',
                'amount' => 1000.00,
                'frequency' => 'monthly',
                'description' => 'Salary for April',
                'rest' => 4000.00,
                'balncebefore' => 5000.00,
                'transaction_date' => '2024-04-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
         ];

        DB::table('transactions')->insert($transactions);
    }
}
