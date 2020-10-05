<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$data = json_decode(file_get_contents('php://input'));
$msg = '';
$event_name = $data->eventName;
$contestant = $data->contestantId;
$votes = abs($data->votes);
$voucher_code = $data->voucherCode;
$phone_number=$data->phoneNumber;
$network = $data->network;
$trans_id = "MBILO-".(time()+5020);
$trans_ref = "MEDIA BILLO VOTING";
$date = date('Y-m-d H:i:s');
try{
require('../connection.php');
require('./sendOtp.php');
$otp = sendOtp($phone_number,$trans_id);

$sql = "INSERT INTO `transaction_logs` (trans_id,trans_ref,voucher_code,status,event_name,
selected_contestant,votes,trans_date,phone_number,networkType,otp) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
$stmt = $connection->prepare($sql);
$res = $stmt->execute([$trans_id,$trans_ref,$voucher_code,'pending',$event_name,$contestant,$votes,$date,$phone_number,$network,$otp]);
$response = array(
    'message'=>"record succesful"
);

$data = array(
    'phone'=>$phone_number,
    'amount'=> number_format((float)$votes*0.6, 2, '.', ''),
    'trans_id'=>$trans_id,
    'network'=>$network,
    'voucher'=>$voucher_code
    );
        require('./paymentRequest.php');

  // executeRequest(json_encode($data));
//echo json_encode($data);
}
catch(PDOException $e) {
    http_response_code(500);
    $response = array(
        'message'=>"An Unknown error has occured, please try again".$e->getMessage()
    );
    echo json_encode($response);
}



?>