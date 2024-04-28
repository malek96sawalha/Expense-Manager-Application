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
                'userId' => 1,
                'categoryname' => 'Salary',
                'type' => 'income',
                'budget' => '1000',
                'image' => 'images/salary logo.jpg',
            ],
            [
                'userId' => 1,
                'categoryname' => 'Investment',
                'type' => 'income',
                'budget' => '2000',
                'image' => 'images/investment logo.png',
            ],
            [
                'userId' => 1,
                'categoryname' => 'Groceries',
                'type' => 'expense',
                'budget' => '5000',
                'image' => 'images/grocery logo.jpg',
            ],
        ];

        // Insert categories into the database
        foreach ($categoriesData as $CategorieData) {
            Categorie::create($CategorieData);
        }
    }
}
