<?php
//$data = json_decode(file_get_contents('php://input'));
 
$trans_id = 'MBILO-1593618977';// $data->trans_ref;
//$message = $data->message;
$status = "000/01";// $data->trans_status;
 require('../connection.php');
if ($status == "000/01" || $message =='Success' || $message =="SUCCESS") {
    
    $sql = "SELECT event_name,selected_contestant,votes,phone_number,status FROM `transaction_logs` WHERE trans_id=?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$trans_id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($result[0]['status'] == 'pending') {
        setVotes($result);
    } else{
        http_response_code(500);
        echo "transaction has already been completed ";
    }
    
}
else{
   
  setFailed();
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
    $phone  = $data[0]['phone_number'];
    try {
       /*  $sql = "UPDATE $event_name SET votes=votes+$votes WHERE id=?";
    $stmt = $connection->prepare($sql);
    $result = $stmt->execute([$contestantId]);  */
    try {
       /*   $sql_2 = "UPDATE $log_table SET status='completed' WHERE trans_id=?";
         $stmt2 = $connection->prepare($sql_2);
         $result2 = $stmt2->execute([$trans_id]);  */
         $contestantName = getContestantName($event_name,$contestantId);
         $msg = 'You have successfylly carted '.$votes.'vote (s) for '.$contestantName.
         ' keep voting to make '.$contestantName.' win. You can vote through our web portal https://www.vote.mediabillo.net and follow us 
         on facebook https://facebook.com/103633607802708/posts/170234311142637/?d=n \nThank You';
         $smsdata = array(
        
            'recipient_number'=> '233'.ltrim($phone,"0"),
            'msg_body'=> $msg ,
            'unique_id'=>$trans_id."S2",
            'trans_type'=>'SMS',
            'sender_id'=>"MEDIABILO",
            'service_id'=>571,
            'msg_type'=>"T"
        );

        require('sendOtp.php');
        sendSMS($smsdata);
        
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

function getContestantName($eventname, $id){
    global $connection;
    $sql = "SELECT contestant_namestatus FROM $eventname WHERE id=?";
    $stmt = $connection->prepare($sql);
    $stmt->execute([$id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result[0]['contestant_name'];
}

function setFailed(){
    global $connection;
    global $trans_id;
     $log_table = 'transaction_logs';
    try {
        $sql_2 = "UPDATE $log_table SET status='failed' WHERE trans_id=?";
         $stmt2 = $connection->prepare($sql_2);
         $result2 = $stmt2->execute([$trans_id]); 
        
    }
    catch(Exception $e){
        echo "error".$e->getMessage();
        
    }
}

function sendSuccessSMS(){

}
?>