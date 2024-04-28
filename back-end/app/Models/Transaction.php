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
        'type',
        'balncebefore',
        'description',
        'transaction_date',
        'frequency'
    ];
    public function category()
    {
        return $this->belongsTo(Categorie::class, 'categoryId');
    }

        public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }


}
