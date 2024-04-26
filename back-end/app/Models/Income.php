<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    use HasFactory;
    protected $fillable = [
        'userId',
        'sourcename',
        'amount',
        'categoryId',
        'rest',
        'balncebefore',
        'transaction_date',
        'frequency'
    ];
}
