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
                'userId' => 'required|exists:users,id',
                'sourcename' => 'required|string',
                'amount' => 'required|numeric',
                'frequency' => 'required|string',
            ]);

            $income = Income::create([
                'userId' => $request->userId,
                'sourcename' => $request->sourcename,
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
    public function update(Request $request, $id)
    {
        try {
            $income = Income::findOrFail($id);
    
            $request->validate([
                'userId' => 'numeric',
                'sourcename' => 'string',
                'amount' => 'numeric',
                'frequency' => 'string',
            ]);
    
            $income->update($request->only(['userId','sourcename', 'amount', 'frequency']));
    
            return response()->json(['message' => 'Income updated successfully'], 200);
        } catch (\Exception $e) {
            // Log the exception or return an error response
            return response()->json(['error' => 'Failed to update income record: ' . $e->getMessage()], 500);
        }
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
