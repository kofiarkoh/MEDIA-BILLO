<?php
//error_reporting(0);
/* header('Content-type: application/json');

header('Access-Control-Allow-Origin: *'); */
//require('./verify_login.php');

require ('./cors_headers.php');
if (!isset( $_POST['event_name'])){
    displayResponse(406,'Event name required');
}
if (!isset( $_FILES['file'])){
    displayResponse(406,'Event photo required');
}
$event_name = $_POST['event_name'];
$error_characters = [' ', '\n'];
$character_replace = ['_', ' '];
$file = $_FILES['file']['tmp_name'];
$file_name = $_FILES['file']['name'];
$file_name = str_replace([' ','  ','  '],'_',$file_name);
$table = trim(strtoupper(str_replace($error_characters, $character_replace, $event_name)));
$status = 0;
$message = '';
$code = 200;
require 'connection.php';

$event_existence = checkExistence($table);
//create a table for the new post
if ($event_existence == true) {
    $sql = "CREATE TABLE `$table` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `contestant_name` varchar(255) NOT NULL,
    `image_path` varchar(255) NOT NULL,
    `votes` int(100) NOT NULL,

    PRIMARY KEY (`id`)
   ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8  ";
    $res = $connection->exec($sql);
    if ($res !== false) {
        $img_path = "./Images/EventImages/" . $file_name;
        $path_db = "http://admin.mediabillo.net/backend/voting/Images/EventImages/" . $file_name; 
       move_uploaded_file($file, $img_path);

        $event_staus = 'inactive';
        $qry = "INSERT INTO billo_event (event_name,image_url,status,is_ended) VALUES (?,?,?,?)";
        $stmt = $connection->prepare($qry);
        $res = $stmt->execute([$table, $path_db,$event_staus,'false']);
        if ($res !== false) {
            $message = "Event Has Been Added";
        } else {
            $code = 500;
            $message = "there was an error ";
        }
    } else {
        $code = 500;
        $message = "An unkown Error has occured";
    }
} else {
    $code = 500;
    $message = "Event Already exists";
}
$response = array(
    'message' => $message,
);
displayResponse($code,$message);

function checkExistence($table_name)
{
    global $connection;
    $count = $connection->query("SELECT COUNT(*) FROM billo_event WHERE event_name = '$table_name' ")->fetchColumn();
    if ($count == 0) {
        $msg = 'does not exist';
        return true;
    } else {
        $msg = 'client already exist';
        return false;
    }
}


