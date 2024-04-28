<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\Categorie;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $transactions = Transaction::with('category')->where('userId', $user->id)->get();
        $allCategories = Categorie::where('userId', $user->id)->get();
        // $cat
        return response()->json(['transactions' => $transactions, 'allCategories' => $allCategories], 200);
    }
    public function TransactionData()
    {
        $user = Auth::user();
        $categories = Categorie::where('userId', $user->id)->get();
        foreach ($categories as $categorie) {
            $data[] = [
                'name' => $categorie->categoryname,
                'Total' => Transaction::where('userId', $user->id)
                    ->where('frequency', 'weekly')
                    ->where('categoryId', $categorie->id)
                    ->sum('amount'), 'amt' => 2100,
            ];
        }

        // $data = [
        //     ['name' => 'Weekly', 'uv' => Transaction::where('userId', $user->id)->where('frequency', 'weekly')->sum('amount')],

        // ];
        // ['name' => 'Monthly', 'uv' => Transaction::where('userId', $user->id)->where('frequency', 'monthly')->sum('amount')],
        // ['name' => 'Yearly', 'uv' => Transaction::where('userId', $user->id)->where('frequency', 'yearly')->sum('amount')],
        // ['name' => 'onlyOnce', 'uv' => Transaction::where('userId', $user->id)->where('frequency', 'onlyOnce')->sum('amount')],
        // ['name' => 'daily', 'uv' => Transaction::where('userId', $user->id)->where('frequency', 'daily')->sum('amount')],
        return response()->json([
            'data' => $data,
            'categories' => $categories
        ], 200);
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

        $request->validate([
            'categoryId' => 'required|exists:categories,id',
            'sourcename' => 'required|string',
            'amount' => 'required|numeric',
            'frequency' => 'required|in:weekly,monthly,yearly,daily,onlyOnce',
            'type' => 'required|in:income,expense',
            'description' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        $user = auth()->user();
        $cat = Categorie::where('id', $request->categoryId)->first();

        if ($request->type == 'income') {
            $rest = $cat->budget + $request->amount;
        } elseif ($request->type == 'expense') {
            $rest = $cat->budget - $request->amount;
        }

        $transaction = Transaction::create([
            'userId' => $user->id,
            'categoryId' => $request->categoryId,
            'type' => $request->type,
            'sourcename' => $request->sourcename,
            'amount' => $request->amount,
            'frequency' => $request->frequency,
            'description' => $request->description,
            'rest' => $rest,
            'balncebefore' => $cat->budget,
            'transaction_date' => $request->transaction_date,
        ]);

        $cat->budget = $rest;

        $cat->save();

        return response()->json(['message' => 'Transaction record created successfully'], 201);
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

        $transaction = Transaction::findOrFail($id);

        $request->validate([
            'sourcename' => 'required|string',
            'amount' => 'required|numeric',
            'frequency' => 'required|in:weekly,monthly,yearly,daily,onlyOnce',
            'type' => 'required|in:income,expense',
            'description' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        $cat = Categorie::where('id', $transaction->categoryId)->first();
        if ($transaction->type == 'income') {
            if ($request->type == 'income') {
                $rest = $transaction->balncebefore + $request->amount;
                $cat->budget -= $transaction->amount;
                $cat->budget += $request->amount;
            } elseif ($request->type == 'expense') {
                $rest = $transaction->balncebefore - $request->amount;
                $cat->budget -= $transaction->amount;
                $cat->budget -= $request->amount;
            }
        } elseif ($transaction->type == 'expense') {
            if ($request->type == 'income') {
                $rest = $transaction->balncebefore + $request->amount;
                $cat->budget += $transaction->amount;
                $cat->budget += $request->amount;
            } elseif ($request->type == 'expense') {
                $rest = $transaction->balncebefore - $request->amount;
                $cat->budget += $transaction->amount;
                $cat->budget -= $request->amount;
            }
        }

        $transaction->type = $request->type;
        $transaction->sourcename = $request->sourcename;
        $transaction->amount = $request->amount;
        $transaction->frequency = $request->frequency;
        $transaction->description = $request->description;
        $transaction->rest = $rest;
        $transaction->transaction_date = $request->transaction_date;

        $transaction->save();
        $cat->save();

        return response()->json(['message' => 'Transaction updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return response()->json(['message' => 'transaction deleted successfully'], 200);
    }


    public function description(Request $request, $id)
    {

        $transaction = Transaction::findOrFail($id);
        
        $request->validate([
            'sourcename' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $transaction->sourcename = $request->sourcename;
        $transaction->description = $request->description;

        $transaction->save();

        return response()->json(['message' => 'Transaction updated successfully'], 200);
    }
}
