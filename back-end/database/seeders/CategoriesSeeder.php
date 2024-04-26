<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categorie;


class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Assuming you have some users already created
        $userIds = \App\Models\User::pluck('id')->toArray();

        // Sample data for categories
        $categoriesData = [
            [
                'userId' => $userIds[array_rand($userIds)],
                'categoryname' => 'Salary',
                'type' => 'income',
            ],
            [
                'userId' => $userIds[array_rand($userIds)],
                'categoryname' => 'Freelance',
                'type' => 'income',
            ],
            [
                'userId' => $userIds[array_rand($userIds)],
                'categoryname' => 'Investment',
                'type' => 'income',
            ],
            [
                'userId' => $userIds[array_rand($userIds)],
                'categoryname' => 'Groceries',
                'type' => 'expense',
            ],
            [
                'userId' => $userIds[array_rand($userIds)],
                'categoryname' => 'Rent',
                'type' => 'expense',
            ],
            [
                'userId' => $userIds[array_rand($userIds)],
                'categoryname' => 'Utilities',
                'type' => 'expense',
            ],
        ];

        // Insert categories into the database
        foreach ($categoriesData as $CategorieData) {
            Categorie::create($CategorieData);
        }
    }
}
