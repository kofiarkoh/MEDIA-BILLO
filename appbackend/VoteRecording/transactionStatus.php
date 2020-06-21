<?php



require '../connection.php';
//header('Content-type:application/json');
$sql = "SELECT * FROM transaction_logs WHERE status='pending'";
$stmt = $connection->prepare($sql);
$stmt->execute();
$transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
require 'fetchPaymentStatus.php';
require './sendmail.php';
$array = [];
$i =0;

foreach ($transactions as $transaction) {
    $trans_id = $transaction['trans_id'];
    $event_name = $transaction['event_name'];
    $contestant = $transaction['selected_contestant'];
    $votes = $transaction['votes'];
    if ($i == 2) {
        return;
    }
   
    $i++;
    // echo $trans_id."-----".$event_name."-------".$contestant."<hr>";
  
    $response = json_decode(executeRequest($trans_id));
    
    $status = $response->trans_status;
  
   $json_string = json_encode($response, JSON_PRETTY_PRINT);
   echo "id $trans_id <br>"; 
   echo $json_string."<hr>";
   sendMail($trans_id,$status);
    if ($status == "000/01") {
        //successful
       setVotes($trans_id,$event_name,$contestant,$votes);
      
    }
    else {
        $log_table = 'transaction_logs';
        try {
            $sql_1 = "UPDATE $log_table SET status='failed' WHERE trans_id=?";
            $stmt1 = $connection->prepare($sql_1);
            $result1 = $stmt1->execute([$trans_id]);

        } catch (Exception $e) {
            echo "error" . $e->getMessage();

        } 
    }
    $res = [$response];
    array_push($array, $response);
  //  */

}
//echo json_encode($array);
function setVotes($trans_id,$eventName,$contestantId,$votes)
{
    global $connection;
    
  
    $log_table = 'transaction_logs';
   // $eventName = $data[0]['event_name'];
    $event_name = str_replace(" ", "_", $eventName);
    //$contestantId = $data[0]['selected_contestant'];
   // $votes = $data[0]['votes'];
    try {
        $sql = "UPDATE $event_name SET votes=votes+$votes WHERE id=?";
        $stmt = $connection->prepare($sql);
        $result = $stmt->execute([$contestantId]);
        try {
            $sql_2 = "UPDATE $log_table SET status='completed' WHERE trans_id=?";
            $stmt2 = $connection->prepare($sql_2);
            $result2 = $stmt2->execute([$trans_id]);

        } catch (Exception $e) {
            echo "error" . $e->getMessage();

        }

    } catch (Exception $e) {
        echo $e;

    }

}
