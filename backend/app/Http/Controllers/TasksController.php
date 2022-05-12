<?php

namespace App\Http\Controllers;

use App\Models\tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return tasks::where('user_id', Auth::id())->orderBy('created_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        tasks::create([
            'name' => $request->name,
            'description' => $request->description,
            'completed' => $request->completed,
            'user_id' => Auth::user()->id,
        ]);

        return response()->json([
            'message' => 'Successfully created task!'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\tasks  $tasks
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return tasks::find($id);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\tasks  $tasks
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string'
        ]);

        $tasks = tasks::find($id);

        $tasks->update([
            'name' => $request->name,
            'description' => $request->description,
            'completed' => $request->completed,
        ]);

        return response()->json([
            'message' => 'Successfully updated task!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\tasks  $tasks
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tasks = tasks::find($id);
        $tasks->delete();

        return response()->json([
            'message' => 'Successfully deleted task!'
        ], 200);
    }
}
