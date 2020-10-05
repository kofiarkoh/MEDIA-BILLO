<?php

session_start();
$phone = $_POST['phone'];

$duration = (1 * 60);

function sendOtp($phone)
{
    $otp = rand(100000, 999999);
    $_SESSION['session_otp'] = $otp;
    echo "sending " . $phone . ' otp ' . $otp;
}

if (isset($_SESSION['started'])) {
    $showform = 0;
    $time = ($duration - (time() - $_SESSION['started']));
    if ($time <= 0) {
        unset($_SESSION['session_otp']);

        $showform == 1;
    }
} else {
    $_SESSION['started'] = time();
}
sendOtp($phone);
