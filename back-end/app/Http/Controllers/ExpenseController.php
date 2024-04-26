<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Expense = Expense::latest()->get();

        return response()->json($Expense);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'userId' => 'required|exists:users,id',
            'categoryId' => 'required|exists:categories,id',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        $transaction = Expense::create($request->all());

        return response()->json(['message' => 'Expense created successfully', 'data' => $transaction], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $Expense = Expense::findOrFail($id);

        return response()->json($Expense);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $Expense = Expense::findOrFail($id);

        $request->validate([
            'userId' => 'required|exists:users,id',
            'categoryId' => 'required|exists:categories,id',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        $Expense->update($request->all());

        return response()->json(['message' => 'Expense updated successfully', 'data' => $Expense]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        //
    }
}
