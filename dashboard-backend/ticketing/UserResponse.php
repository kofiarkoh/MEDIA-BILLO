<?php 
header('Content-type: application/json');
/* header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"); */
//header("Access-Control-Allow-Headers: Authorization");
/* header("Access-Control-Allow-Headers: Authorization");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  */
//error_reporting(1);
class UserResponse{
    static function displayMessage($code,$msg) {
        $response = array(
            'resp_code'=> $code,
            'message' => $msg
         );
        http_response_code($code);
        echo json_encode($response);
        die();

    }

    static function displaySuccess($code,$msg) {
        $response = array(
            'resp_code'=> $code,
            'message' => $msg
         );
        http_response_code($code);
        echo json_encode($response);
        die();

    }
}
?>