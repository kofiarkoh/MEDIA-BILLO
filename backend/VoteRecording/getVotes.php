<?php
$data = json_decode(file_get_contents('php://input'));
$event_name = $data->eventName;
$contestant = $data->contestantId;
$votes = $data->votes;
$voucher_code = $data->voucherCode;
$trans_id = "MBILO-".(time()+5020);
$trans_ref = "MEDIA BILLO VOTING";
$date = date('Y-m-d H:i:s');
echo $voucher_code;
require('../connection.php');
$sql = "INSERT INTO `transaction_logs` (trans_id,trans_ref,voucher_code,status,event_name,
selected_contestant,votes,trans_date) VALUES (?,?,?,?,?,?,?,?)";
$stmt = $connection->prepare($sql);
$res = $stmt->execute([$trans_id,$trans_ref,$voucher_code,'pending',$event_name,$contestant,$votes,$date]);
?>