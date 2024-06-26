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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = auth()->user();
            $categories = categorie::where('userId', $user->id)->get();
            return response()->json(['categories' => $categories]);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to retrieve categories', 'error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve categories', 'error' => $e->getMessage()], 500);
        }
    }

    // public function store(Request $request)
    // {
    //     $user = Auth::user();


    //     // dd($request->request);
    //     // print('<pre>');
    //     // print_r($request->hasFile('image'));
    //     // print('</pre>');
    //     // die;
    //        $data =  $request->request;

    //         $data->validate([
    //             'categoryname' => 'required',
    //             'type' => 'required|in:income,expense',
    //             'image' => 'image|mimes:jpeg,png,jpg,gif',

    //         ]);


    //         if ($request->hasFile('image')) {
    //             $image = $request->file('image');
    //             $imageName = time() . '.' . $image->getClientOriginalExtension();
    //             $image->move(public_path('images'), $imageName);
    //         }

    //         $category = categorie::create([

    //             'userId' => $user->id,
    //             'categoryname' => $request->categoryname,
    //             'type' => $request->type,
    //             'budget' => $request->budget,
    //             'image' => $imageName ? 'images/' . $imageName : null, // Handle case when no image is uploaded
    //         ]);


    //         return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);

    // }
    // public function store(Request $request)
    // {
    //     $user = Auth::user();


    //     // dd($request->request);
    //     $validator = Validator::make($request->all(), [

    //         'categoryname' => 'required|string',
    //         // 'type' => 'required|in:imcome,expense',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => 422,
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');
    //         $imageName = time() . '.' . $image->getClientOriginalExtension();
    //         $image->move(public_path('images'), $imageName);
    //     }
    //     $cate = new Categorie();
    //     $cate->user_id = $user->id; // Assign user ID to user_id attribute
    //     $cate->image = 'images/' . $imageName;
    //     $cate->categoryname = $request->categoryname;
    //     $cate->type = $request->type;
    //     $cate->budget = $request->budget;
    //     $cate->save();




    //     return response()->json(['message' => 'Category created successfully', 'category' => $cate], 201);
    // }

    public function store(Request $request)
    {
        if (auth()->check()) {
            $user = auth()->user();
            
            $validator = Validator::make($request->all(), [
                'categoryname' => 'required|string',
                // 'type' => 'required|in:imcome,expense',
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors()
                ], 422);
            }
            // dd($request);
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
            }
            
            $cate = new Categorie();
            $cate->userId = $user->id; // Assign user ID to user_id attribute
            $cate->image = 'images/' . $imageName;
            $cate->categoryname = $request->categoryname;
            $cate->type = $request->type;
            $cate->budget = $request->budget;
            $cate->save();
            
            return response()->json(['message' => 'Category created successfully', 'category' => $cate], 201);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
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











    // public function updateWithImage(Request $request, $id)
    // {

    //     try {
    //         $category = categorie::findOrFail($id);
    //         // if ($category->userId !== Auth::id()) {
    //         //     return response()->json(['message' => 'Unauthorized'], 401);
    //         // }
    //         if ($request->hasFile('image')) {
    //             $image = $request->file('image');
    //             $imageName = time() . '.' . $image->getClientOriginalExtension();
    //             $image->move(public_path('/images'), $imageName);
    //         }
    //         $category->update([
    //             'categoryname' => $request->categoryname,
    //             'budget' => $request->budget,
    //             'image' => 'images/' . $imageName,
    //         ]);

    //         return response()->json(['message' => 'Category updated successfully', 'category' => $category], 201);
    //     } catch (ValidationException $e) {
    //         return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => 'Failed to update category', 'error' => $e->getMessage()], 500);
    //     }
    // }
    public function updateWithImage(Request $request, $id)
    {
        $cate = Categorie::findOrFail($id);

        if (auth()->check()) {

            
            $validator = Validator::make($request->all(), [
                'categoryname' => 'required|string',
                // 'type' => 'required|in:imcome,expense',
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors()
                ], 422);
            }
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $cate->image = 'images/' . $imageName;
            }
            
        
            $cate->categoryname = $request->categoryname;
            $cate->type = $request->type;
            $cate->budget = $request->budget;
            $cate->save();
            
            return response()->json(['message' => 'Category edited successfully', 'category' => $cate], 201);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
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
                'state' => 'in:income,expense',
                'userId' => 'required|exists:users,id'
            ]);

            $state = $request->state;
            $userId = $request->userId;
            // if ($userId !== Auth::id()) {
            //     return response()->json(['message' => 'Unauthorized'], 401);
            // }
            $categories = categorie::where('userId', $userId)
                ->select('id', 'categoryname', 'type')
                ->get();
            if ($request->state) {
                $categories = categorie::where('type', $state)
                    ->where('userId', $userId)
                    ->select('id', 'categoryname', 'type')
                    ->get();
            }

            return response()->json(['categories' => $categories]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve categories', 'error' => $e->getMessage()], 500);
        }
    }

    public function showBudget(Request $request)
    {
        // Fetch all categories along with their related transactions and calculate the total amount transacted
        $categories = Categorie::with('transactions')
            ->get()
            ->map(function ($category) {
                $totalTransactionAmount = $category->transactions->sum('amount');
                $remainingBudget = $category->budget - $totalTransactionAmount;

                return [
                    'category_id' => $category->id,
                    'category_name' => $category->categoryname,
                    'total_transaction_amount' => $totalTransactionAmount,
                    'budget' => $category->budget,
                    'remaining_budget' => $remainingBudget,
                ];
            });

        return response()->json(['categories' => $categories]);
    }
}
