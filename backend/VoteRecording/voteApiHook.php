<?php
$data = json_decode(file_get_contents('php://input'));
$trans_id = $data->trans_id;
$message = $data->message;
if ($message == 'Success') {
    require('../connection.php');
    $sql = "SELECT event_name,selected_contestant,votes FROM `transaction_logs` WHERE trans_id=?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$trans_id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print_r($result);
    setVotes($result);
}
//echo $trans_id;

function setVotes($data) {
    global $connection;
    $eventName = $data[0]['event_name'];
    $contestantId = $data[0]['selected_contestant'];
    $votes = $data[0]['votes'];
    $sql = "UPDATE $eventName SET votes=votes+$votes WHERE id=?";
    $stmt = $connection->prepare($sql);
    $result = $stmt->execute([$contestantId]); 
    //echo $votes;
}
?>