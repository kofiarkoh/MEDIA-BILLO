<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//$otp = $_POST['otp'];
$otp = json_decode(file_get_contents('php://input'))->otp;

require '../connection.php';
$sql = "SELECT * FROM transaction_logs WHERE otp=$otp";
$stmt = $connection->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
$otp_status = ago(strtotime($res['trans_date']));
if ($res['otp_status'] != 'expired') {
    if ($otp_status <= 5) {
        
        $sql2 = "UPDATE transaction_logs set otp_status='expired' WHERE otp=$otp";
        $stmt2 = $connection->prepare($sql2);
        $stmt2->execute();
        $data = array(
            'phone' => $res['phone_number'],
            'amount' => number_format((float) $res['votes'] * 0.42, 2, '.', ''),
            'trans_id' => $res['trans_id'],
            'network' => $res['networkType'],
            'voucher' => $res['voucher_code'],
        );
        $duration = ago(strtotime($res['trans_date'])); // time()-strtotime($res['trans_date']);

        // echo "stamtp is ".$duration;

        require './paymentRequest.php';
        executeRequest(json_encode($data));
        echo json_encode(array(
            "resp_code" => 200,
            "message" => "Mobile number verification succesful, Please wait for promt on your phone to complete payment"));

    } else {
        //echo "incorrect ".$otp_status;

        echo json_encode(array(
            "resp_code" => 408,
            "message" => "Mobile number verification failed "));

    }
} else{
    echo json_encode(array(
        "resp_code" => 408,
        "message" => "The Pin you entered has expired"));
}

function verifyOtp($otp)
{
    if ($otp == $_SESSION['session_otp']) {
        unset($_SESSION['session_otp']);

        return true;
    } else {
        http_response_code(408);
        return true;
    }
}
function ago($time)
{
    $timediff = time() - $time;

    $days = intval($timediff / 86400);
    $remain = $timediff % 86400;
    $hours = intval($remain / 3600);
    $remain = $remain % 3600;
    $mins = intval($remain / 60);
    $secs = $remain % 60;

   

    return $mins;
}
