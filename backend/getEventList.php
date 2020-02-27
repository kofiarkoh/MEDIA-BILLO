<?php
require('./connection.php');
$sql = "SELECT * FROM billo_event";
$stmt = $connection->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($res);
?>