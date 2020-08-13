<?php

require './connection.php';
$sql = "SELECT * FROM transaction_logs WHERE status='completed'";
$stmt = $connection->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($res as $result) {
    $response = json_decode(file_get_contents("http://admin.mediabillo.net/appbackend/VoteRecording/fetchPaymentStatus.php?id=" . $result['trans_id']));

   
    if ($response->trans_status != '000/01') {
        $id = $result['trans_id'];
        $sql2 = "SELECT * FROM transaction_logs WHERE trans_id='$id'";
        $stmt2 = $connection->prepare($sql2);
        $stmt2->execute();
        $res2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);

         echo "{$response->trans_ref}..........";
        echo "{$response->trans_status}.........."; 
        echo "{$res2[0]['votes']}...........";
       echo "{$response->message}<hr/>";
   }

}
