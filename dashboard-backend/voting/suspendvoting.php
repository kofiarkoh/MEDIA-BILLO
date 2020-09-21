<?php

require './cors_headers.php';

$event_name = $_POST['event_name'];
$event_status = $_POST['event_status'];
$error_characters = [' ', '\n'];
$character_replace = ['_', ' '];
$table = trim(strtoupper(str_replace($error_characters, $character_replace, $event_name)));

$message = '';
require('connection.php');
$sql = "UPDATE billo_event SET is_ended='$event_status' WHERE event_name = '$table'" ;
$res = $connection->exec($sql) ;
if ($res !== false ) {
   $message= "success".$table;
   displayResponse(200,$message);
}
else {
    http_response_code(500);
    $message= "There was an error, please try again";
    displayResponse(500,$message);
}

?>