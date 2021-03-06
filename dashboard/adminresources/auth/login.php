<?php
session_start();
require('./connection.php');

require __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");





$username = $_POST['username'];
$password = $_POST['password'];

$table_name = 'users';

$query = "SELECT id, username,name, password,status FROM " . $table_name . " WHERE username = ? LIMIT 0,1";

$stmt = $connection->prepare( $query );
$stmt->bindParam(1, $username);
$stmt->execute();
$num = $stmt->rowCount();

if($num > 0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $row['id'];
    $username = $row['username'];
    $name = $row['name'];
    $password2 = $row['password'];
    $status = $row['status'];

    if(password_verify($password, $password2))
    {
        $_SESSION['status']= $status;
        logUser($name);
        $secret_key = "mbillo";
        $issuer_claim = "THE_ISSUER"; // this can be the servername
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time(); // issued at
        $notbefore_claim = $issuedat_claim + 5; //not before in seconds
        $expire_claim = $issuedat_claim + 3600; // expire time in seconds
        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array(
                "id" => $id,
                "username" => $username,
                "name" => $name,
                
        ));

        http_response_code(200);

        $jwt = JWT::encode($token, $secret_key);
        echo json_encode(
            array(
                "message" => "Successful login.",
                "token" => $jwt,
                "email" => $username,
                "expireAt" => $expire_claim
            ));
    }   
    else{

        http_response_code(401);
        echo json_encode(array("message" => "Login failed. Incorrect Pasword"));
    }
}
else{
    http_response_code(404);

    echo    json_encode(array("message" => "User not found"));
}


function logUser($name) {
    global $connection;
    $qry = "INSERT INTO login_logs (name,login_time) VALUES (?,?)";
    $stmt = $connection->prepare($qry);
    $res = $stmt->execute([$name,date('Y-m-d H:i:s')]);
}
?> 