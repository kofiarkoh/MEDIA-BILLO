<?php

require('./connection.php');

require __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function verifyLoginStatus(){
    global $connection;

$secret_key = "YOUR_SECRET_KEY";
$jwt = null;
$access = null;
//$data = json_decode(file_get_contents("php://input"));


$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
$arr = explode(" ", $authHeader);
$jwt = $arr[1];



    try {

        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));

        // Access is granted. Add code of the operation here 
          //  $access = true;
      echo json_encode(array(
            "message" => "Access granted:"
          
        ));
        
 
   // return true;
    }
    catch (Exception $e){
            //access denied
            http_response_code(401);
            $access = false;

             echo json_encode(array(
                "message" => "Access denied.",
                "error" => $e->getMessage()
            )); 
           // return false;
    }

   
}
/* $res=verifyLoginStatus();
echo json_encode(array(
    "message" => "Access dis ".$res,
    
)); */
?>
