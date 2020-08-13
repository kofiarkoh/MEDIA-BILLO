<?php
header('Content-type:application/json');
require('./connection.php');
$event_name ='THE JOY MODEL CHALLENGE' ;// $_GET['eventName'];
try {
    $sql = "SELECT * FROM `transaction_logs` ORDER BY trans_date DESC" ;//WHERE event_name='$event_name' ";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($res);
} catch (\Throwable $th) {
    //throw $th;
    echo $th;
}

?>