<?php
//error_reporting(0);
$event_name = $_POST['event_name'];
$error_characters = [' ', '\n'];
$character_replace = ['_', ' '];
$table = trim(strtoupper(str_replace($error_characters, $character_replace, $event_name)));
$status = 0;
$message = '';
require 'connection.php';

$event_existence = checkExistence($table);
//create a table for the new post
if ($event_existence) {
    $sql = "CREATE TABLE `$table` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `contestant_name` varchar(255) NOT NULL,
    `image_path` varchar(255) NOT NULL,
    `votes` int(100) NOT NULL,

    PRIMARY KEY (`id`)
   ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8  ";
    $res = $connection->exec($sql);
    if ($res !== false) {

        $event_staus = 'inactive';
        $qry = "INSERT INTO billo_event (event_name,status) VALUES (?,?)";
        $stmt = $connection->prepare($qry);
        $res = $stmt->execute([$table, $event_staus]);
        if ($res !== false) {
            $message = "Event Has Been Added";
        } else {
            http_response_code(500);
            $message = "there was an error ";
        }
    } else {
        http_response_code(500);
        $message = "An unkown Error has occured";
    }
} else {
    http_response_code(500);
    $message = "Event Already exists";
}
$response = array(
    'message' => $message,
);
echo json_encode($response);

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
