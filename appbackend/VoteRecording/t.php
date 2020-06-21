<?php
session_start();
//$_SESSION['session_otp'] = 554454;
$otp = $_POST['otp'];
 die("dd ".$otp." hi ".$_SESSION['session_otp']);
    if ($otp == $_SESSION['session_otp']) {
        unset($_SESSION['session_otp']);
        echo "hi";
    } else {
        http_response_code(408);
       echo 'falseg '.$_SESSION['session_otp']." dd";
        
    }

?>
