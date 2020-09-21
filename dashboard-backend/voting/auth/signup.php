<?php
 if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }
  
  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
  
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  
    exit(0);
  }
require '../response.php';
require './verify_login.php';
include_once './connection.php';
require '../response.php';
require './checkuserExistence.php';

$msg = '';
$code = 200;

$name = $_POST['name'];
$username = $_POST['username'];
$password = $_POST['password'];
$accountType = $_POST['accountType'];
$user_exists = checkExistence($name);
if ($user_exists == false) {
    http_response_code(409);
    $msg = $name . " Already Exists";
    $code = 409;
    displayResponse($code,$msg);
}
$table_name = 'users';

$query = "INSERT INTO " . $table_name . "
                SET
                    name=:name,
                    username = :username,

                    password = :password , status=:type";

$stmt = $connection->prepare($query);

$stmt->bindParam(':name', $name);
$stmt->bindParam(':username', $username);
$stmt->bindParam(':type', $accountType);
$password_hash = password_hash($password, PASSWORD_BCRYPT);

$stmt->bindParam(':password', $password_hash);

if ($stmt->execute()) {

    http_response_code(200);
    $msg = "User was successfully registered.";
    $code = 200;
} else {
    http_response_code(400);

    $msg = "Unable to register the user.";
    $code = 500;                                                                
}
displayResponse($code, $msg);
