<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tasks extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'completed', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // getAtribute completed tasks return true or false
    public function getCompletedAttribute($value)
    {
        return $value == 1 ? true : false;
    }
}
