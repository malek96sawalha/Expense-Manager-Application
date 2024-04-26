<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;



class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = categorie::all();
        return response()->json(['categories' => $categories]);
    }

    public function create()
    {
        // Not applicable for API
    }

    public function store(Request $request)
    {
        $request->validate([
            'categoryname' => 'required|unique:categories',
            'type' => 'required|in:income,expense',
        ]);
        $user = Auth::user();
        $category = categorie::create([
            // 'userId' => $user->id,
            'userId' => $request->userId,
            'categoryname' => $request->categoryname,
            'type' => $request->type,
        ]);

        return response()->json(['category' => $category], 201);
    }

    public function show($id)
    {
        $category = categorie::findOrFail($id);
        return response()->json(['category' => $category]);
    }

    public function edit($id)
    {
        // Not applicable for API
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'categoryname' => 'required|unique:categories,categoryname,' . $id,
            'type' => 'required|in:income,expense',
        ]);

        $category = categorie::findOrFail($id);
        $category->update([
            'categoryname' => $request->categoryname,
            'type' => $request->type,
        ]);

        return response()->json(['category' => $category]);
    }

    public function destroy($id)
    {
        $category = categorie::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}
