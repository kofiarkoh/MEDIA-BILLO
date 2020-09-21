<?php
require('./verify_login.php');

//header('Access-Control-Allow-Origin: *');

$event_name = $_POST['event_name'];
$error_characters = [' ', '\n'];
$character_replace = ['_', ' '];
$table = trim(strtoupper(str_replace($error_characters, $character_replace, $event_name)));

$message = '';
require('connection.php');
$sql = "DROP TABLE $table ; DELETE FROM billo_event WHERE event_name = '$table'" ;
$res = $connection->exec($sql) ;
if ($res !== false ) {
   $message= "success";
}
else {
    http_response_code(500);
    $message= "There was an error, please try again";
}
$response = array(
    'message'=>$message
);
echo json_encode($response);
?>