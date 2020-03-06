<?php

//error_reporting(0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        require('./connection.php');
        require  './auth/vendor/autoload.php';
        use Firebase\JWT\JWT;

$secret_key = "mbillo";
$jwt = null;


$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
 $arr = explode(" ", $authHeader);
$jwt = $arr[1];


    try {
        JWT::$leeway = 5; 

        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));
      
        // Access is granted. Add code of the operation here
        //
  
    }
    catch (Exception $e){
            //access denied
            http_response_code(401);
          

             echo json_encode(array(
                "message" => "Access denied...".$e->getMessage().$jwt,
               
            )); 
           die();
           // return false;
    } 
?>
