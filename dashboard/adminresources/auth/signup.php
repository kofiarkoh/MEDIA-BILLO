<?php
include_once './connection.php';
require('./checkuserExistence.php');
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$firstName = '';
$lastName = '';
$email = '';
$password = '';


/* $data = json_decode(file_get_contents("php://input"));
$name = trim($data->name);
$username = $data->username;
$password = $data->password; */
$name = $_POST['name'];
$username = $_POST['username'];
$password = $_POST['password'];

$user_exists = checkExistence($name);
if ($user_exists == false) {
    http_response_code(409);
    echo json_encode(array("message" => $name." Already Exists"));
    die();
}
$table_name = 'users';

$query = "INSERT INTO " . $table_name . "
                SET 
                    name=:name,
                    username = :username,
                   
                    password = :password , status='nonadmin'";

$stmt = $connection->prepare($query);

$stmt->bindParam(':name',$name);
$stmt->bindParam(':username', $username);
$password_hash = password_hash($password, PASSWORD_BCRYPT);

$stmt->bindParam(':password', $password_hash);


if($stmt->execute()){

    http_response_code(200);
    echo json_encode(array("message" => "User was successfully registered."));
}
else{
    http_response_code(400);

    echo json_encode(array("message" => "Unable to register the user."));
}
?>
