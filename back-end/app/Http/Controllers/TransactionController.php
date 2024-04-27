<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transaction = Transaction::all();
        return response()->json([' transaction' => $transaction], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'userId' => 'required|exists:users,id',
                'categoryId' => 'required|exists:categories,id',
                'type' => 'required|in:Income,Expense',
                'sourcename' => 'required|string',
                'amount' => 'required|numeric',
                'frequency' => 'required|in:weekly,monthly,yearly,daily',
                'description' => 'nullable|string',
                'rest' => 'nullable|numeric',
                'balncebefore' => 'required|numeric',
                'transaction_date' => 'required|date',
            ]);


            $transaction = Transaction::create([
                'userId' => $request->userId,
                'categoryId' => $request->categoryId,
                'type' => $request->type,
                'sourcename' => $request->sourcename,
                'amount' => $request->amount,
                'frequency' => $request->frequency,
                'description' => $request->description,
                'rest' => $request->rest,
                'balncebefore' => $request->balncebefore,
                'transaction_date' => $request->transaction_date,
            ]);

            // If you need to return something after successful creation
            return response()->json(['message' => 'Transaction record created successfully'], 201);
        } catch (\Exception $e) {
            // Log the exception or return an error response
            return response()->json(['error' => 'Failed to store transaction record: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        return response()->json(['transaction' => $transaction], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $income = Transaction::findOrFail($id);

            $request->validate([
                'categoryId' => 'required|exists:categories,id',
                'type' => 'required|in:Income,Expense',
                'sourcename' => 'required|string',
                'amount' => 'required|numeric',
                'frequency' => 'required|in:weekly,monthly,yearly,daily',
                'description' => 'nullable|string',
                'rest' => 'nullable|numeric',
                'balncebefore' => 'required|numeric',
                'transaction_date' => 'required|date',
            ]);

            $income->update($request->only(['sourcename', 'amount', 'frequency', 'categoryId', 'rest', 'balncebefore', 'transaction_date', 'type']));

            return response()->json(['message' => 'Income updated successfully'], 200);
        } catch (\Exception $e) {
            // Log the exception or return an error response
            return response()->json(['error' => 'Failed to update income record: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return response()->json(['message' => 'transaction deleted successfully'], 200);
    }


}
