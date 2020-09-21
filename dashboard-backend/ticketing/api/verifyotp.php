<?php
header('Content-type: Application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require('../db.class.php');
require('../UserResponse.php');
require('../PaymentRequest.php');
require('../Ticket.php');
require('../dberrorhandler.php');

$otp = $_GET['otp'];
Ticket::verifyOtp($otp);