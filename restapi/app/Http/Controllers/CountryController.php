<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;
use Validator;

class CountryController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Country::all();
        return response()->json($countries, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
                $attributes = $request->all();
                $rules = [
                    'name' => ['required', 'string', 'max:255', 'unique:countries'],
                    'alpha1' => ['required', 'string'],
                    'alpha2' => ['required']
                ];

                $validator = Validator::make($attributes, $rules);

                if ($validator->fails()) {
                    return response()->json($validator->errors(), 412);
                }

                $result = Country::create($attributes);

                if($result){
                    return response()->json(['data' => $result, 'status' => 'success', 'message'=>'Country created successfully'], 200);
                }

                return response()->json(['error'=>'Something went wrong'], 412);

        } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
        }

    }
}
