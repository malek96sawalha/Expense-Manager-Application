<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Income;
class IncomeController extends Controller
{

    public function index()
    {
        $incomes = Income::all();
        return response()->json(['incomes' => $incomes], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'source_name' => 'required|string',
                'amount' => 'required|numeric',
                'frequency' => 'required|string',
            ]);
    
            $income = Income::create([
                'user_id' => $request->user_id,
                'source_name' => $request->source_name,
                'amount' => $request->amount,
                'frequency' => $request->frequency,
            ]);
    
            // If you need to return something after successful creation
            return response()->json(['message' => 'Income record created successfully'], 201);
        } catch (\Exception $e) {
            // Log the exception or return an error response
            return response()->json(['error' => 'Failed to store income record: ' . $e->getMessage()], 500);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Income $income)
    {
        return response()->json(['income' => $income], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Income $income)
    {
        $request->validate([
            'source_name' => 'string',
            'amount' => 'numeric',
            'frequency' => 'string',
        ]);

        $income->update($request->only(['source_name', 'amount', 'frequency']));

        return response()->json(['message' => 'Income updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Income $income)
    {
        $income->delete();

        return response()->json(['message' => 'Income deleted successfully'], 200);
    }
}