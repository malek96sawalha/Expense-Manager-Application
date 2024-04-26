<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;
    protected $fillable = [
        'userId',
        'categoryId',
        'amount',
        'description',
        'rest',
        'transaction_date',
    ];



    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
