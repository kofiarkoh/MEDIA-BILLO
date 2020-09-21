<?php
require('./verify_login.php');


$event_name = $_POST['event_name'];
$table_name = str_replace(' ','_',$event_name);
$sql = "SELECT * FROM $table_name";
$stmt = $connection->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($res);
?>