<?php
require('./connection.php');
$event_name = $_POST['event_name'];
$sql = "SELECT * FROM $event_name";
$stmt = $connection->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($res);
?>