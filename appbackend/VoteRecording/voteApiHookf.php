<?php
$data = json_decode(file_get_contents('php://input'));
 
$trans_id = $data->trans_ref;
$message = $data->message;
 
if ($message == 'SUCCESS') {
    require('../connection.php');
    $sql = "SELECT event_name,selected_contestant,votes,status FROM `transaction_logs` WHERE trans_id=?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$trans_id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print_r($result);
    echo "yie ".$result[0]['status'];
    $to_email = "lawrencearkoh6@gmail.com";
   $subject = "Simple Email Test via PHP";
   $body = "successful";
   $headers = "From: sender@example.com";
 echo "done";
   if ( mail($to_email, $subject, $body, $headers)) {
      echo("Email successfully sent to $to_email...");
   } else {
      echo("Email sending failed...");
   }
   
   
    if ($result[0]['status'] == 'pending') {
        setVotes($result);
    } else{
        http_response_code(500);
       echo "transaction has already been completed ";
    }
    
}
else{
    echo "error";
    $to_email = "lawrencearkoh6@gmail.com";
   $subject = "Some failed transaction".$message;
   $body = "error ";
   $headers = "From: sender@example.com";
 
   if ( mail($to_email, $subject, $body, $headers)) {
      echo("Email successfully sent to $to_email...");
   } else {
      echo("Email sending failed...");
   }
}

//echo $trans_id;
function setVotes($data) {
    global $connection;
    global $trans_id;
    echo "the is ".$trans_id."hid";
    $log_table = 'transaction_logs';
    $eventName = $data[0]['event_name'];
    $event_name = str_replace(" ","_",$eventName);
    $contestantId = $data[0]['selected_contestant'];
    $votes = $data[0]['votes'];
    try {
        $sql = "UPDATE $event_name SET votes=votes+$votes WHERE id=?";
    $stmt = $connection->prepare($sql);
    $result = $stmt->execute([$contestantId]); 
    try {
         $sql_2 = "UPDATE $log_table SET status='completed' WHERE trans_id=?";
         $stmt2 = $connection->prepare($sql_2);
         $result2 = $stmt2->execute([$trans_id]); 
        
        
    }
    catch(Exception $e){
        echo "error".$e->getMessage();
        
    }
   
    }
    catch(Exception $e){
        echo $e;
        
    }
    
    //echo $votes;
}
?>