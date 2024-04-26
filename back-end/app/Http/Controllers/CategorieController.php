<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;







class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $categories = categorie::all();
            return response()->json(['categories' => $categories]);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to retrieve categories', 'error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve categories', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'categoryname' => 'required',
                'type' => 'required|in:income,expense',
                'userId' => [
                    'required',
                    Rule::exists('users', 'id')->where(function ($query) use ($request) {
                        $query->where('id', $request->userId);
                    })
                ]
            ]);

            $category = categorie::create([
                'userId' => $request->userId,
                'categoryname' => $request->categoryname,
                'type' => $request->type,
            ]);

            return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create category', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $category = categorie::findOrFail($id);
            return response()->json(['category' => $category]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Category not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve category', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'categoryname' => 'required|unique:categories,categoryname,' . $id,
                'type' => 'required|in:income,expense',
            ]);
            $category = categorie::findOrFail($id);
            // if ($category->userId !== Auth::id()) {
            //     return response()->json(['message' => 'Unauthorized'], 401);
            // }
            $category->update([
                'categoryname' => $request->categoryname,
                'type' => $request->type,
            ]);

            return response()->json(['message' => 'Category updated successfully', 'category' => $category], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update category', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $validator = validator(['id' => $id], ['id' => 'required|exists:categories,id']);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $category = categorie::findOrFail($id);
            // if ($category->userId !== Auth::id()) {
            //     return response()->json(['message' => 'Unauthorized'], 401);
            // }

            $category->delete();
            return response()->json(['message' => 'Category deleted successfully'], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete category', 'error' => $e->getMessage()], 500);
        }
    }

    public function getByStateAndUserId(Request $request)
    {

        try {
            $request->validate([
                'state' => 'required|in:income,expense',
                'userId' => 'required|exists:users,id'
            ]);

            $state = $request->state;
            $userId = $request->userId;
            // if (userId !== Auth::id()) {
            //     return response()->json(['message' => 'Unauthorized'], 401);
            // }

            $categories = categorie::where('type', $state)
                ->where('userId', $userId)
                ->select('id', 'categoryname')
                ->get();

            return response()->json(['categories' => $categories]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve categories', 'error' => $e->getMessage()], 500);
        }
    }
}
