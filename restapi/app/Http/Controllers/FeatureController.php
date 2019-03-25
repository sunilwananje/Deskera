<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feature;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($iso2)
    {
    	$features = Feature::where('country', $iso2)->get();
        return response()->json($features, 200);
    }

    public function getCountry($ip){
    	// Get cURL resource
		$curl = curl_init();
		// Set some options - we are passing in a useragent too here
		curl_setopt_array($curl, [
		    CURLOPT_RETURNTRANSFER => 1,
		    CURLOPT_URL => 'http://ip-api.com/json/'.$ip,
		    CURLOPT_USERAGENT => 'Codular Sample cURL Request'
		]);
		// Send the request & save response to $resp
		$resp = curl_exec($curl);
		// Close request to clear up some resources
		curl_close($curl);

		return response()->json(json_decode($resp), 200);	
    }
}
