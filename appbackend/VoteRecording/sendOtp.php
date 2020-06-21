<?php

//session_start();
//$phone = $_POST['phone'];

$duration = (5 * 60);

function sendOtp($phone,$trans_id)
{
    $otp = rand(100000, 999999);
    $_SESSION['session_otp'] = $otp;
    echo "sending " . $phone . ' otp ' . $_SESSION['session_otp'];
     $smsdata = array(
        
        'recipient_number'=> '233'.ltrim($phone,"0"),
        'msg_body'=> "Your pin is ".$_SESSION['session_otp'] ,
        'unique_id'=>$trans_id."S",
        'trans_type'=>'SMS',
        'sender_id'=>"MEDIABILO",
        'service_id'=>571,
        'msg_type'=>"T"
    );
  sendSMS($smsdata);
    return $_SESSION['session_otp'];
}
/*

if (isset($_SESSION['started'])) {
 
    $time = ($duration - (time() - $_SESSION['started']));
    if ($time <= 0) {
        unset($_SESSION['session_otp']);
         unset($_SESSION['started']);

    }
} else {
    $_SESSION['started'] = time();
}*/
//sendOtp($phone);
function sendSMS($sms_data){
  $service_id =571;
$base_url = 'https://orchard-api.anmgw.com';
$client_key = 'edZf2oxWaijXXVj5ToHScyzB7gU51RDGeMi8LqxwOZ6/sH+G1qhUGoIAX3RwbZqo/47dHdtfzd6/C1+S7MW6KA==';
$secrete_key = 'hja3WVEdB5bAQWYhhi2dPzTVx3Ppv9ydlJooZQU3sN6/MF56vZTipp7VtMScwfZZXODwGXuz4AEXT+ILIxlV5g==';

    try {
        //code...
        $body = json_encode($sms_data);

    $signature = hash_hmac('sha256',$body,$secrete_key);
    $auth = 'Authorization: '.$client_key.':'.$signature;
    
    $ch = curl_init($base_url.'/sendSms');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLINFO_HEADER_OUT, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
     
    // Set HTTP Header for POST request 
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      //  'Content-Type: application/json',
        'Authorization: '.$client_key.':'.$signature
      //  'Content-Length: ' . strlen($payload))
    ));
        $result = curl_exec($ch);
        
       echo $result;
       

    } catch (Exception $e) {
        //throw $th;
        echo $e->getMessage();
       

    }
    curl_close($ch); 
  
}
