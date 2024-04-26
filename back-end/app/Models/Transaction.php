<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'userId',
        'sourcename',
        'amount',
        'categoryId',
        'rest',
        'balncebefore',
        'description',
        'transaction_date',
        'frequency'
    ];
}
