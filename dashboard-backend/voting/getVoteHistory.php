<?php
require './cors_headers.php';
require('./connection.php');
$event_name =$_GET['eventName'];
try {
    $sql = "SELECT * FROM `transaction_logs` WHERE event_name='$event_name' ORDER BY trans_date DESC" ;//WHERE event_name='$event_name' ";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($res);
} catch (\Throwable $th) {
    //throw $th;
    echo $th;
}

?>