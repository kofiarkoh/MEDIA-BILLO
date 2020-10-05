<?php
$data = json_decode(file_get_contents('php://input'));
$msg = '';
$event_name = $data->eventName;
$contestant = $data->contestantId;
$votes = $data->votes;
$voucher_code = $data->voucherCode;
$phone_number=$data->phoneNumber;
$network = $data->network;
$trans_id = "MBILO-".(time()+5020);
$trans_ref = "MEDIA BILLO VOTING";
$date = date('Y-m-d H:i:s');
try{
require('../connection.php');
require('./otp_process.php');
$otp = sendOtp();
$sql = "INSERT INTO `transaction_logs` (trans_id,trans_ref,voucher_code,status,event_name,
selected_contestant,votes,trans_date,phone_number,networkType,otp) VALUES (?,?,?,?,?,?,?,?,?,?)";
$stmt = $connection->prepare($sql);
$res = $stmt->execute([$trans_id,$trans_ref,$voucher_code,'pending',$event_name,$contestant,$votes,$date,$phone_number,$network,$otp]);
$response = array(
    'message'=>"record succesful"
);
echo json_encode($response);
}
catch(PDOException $e) {
    http_response_code(500);
    $response = array(
        'message'=>"An Unknown error has occured, please try again"
    );
    echo json_encode($response);
}
?>