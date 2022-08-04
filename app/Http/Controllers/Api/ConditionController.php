<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Condition;

class ConditionController extends Controller
{
    public function index()
    {
        return Condition::all();
    }
}
