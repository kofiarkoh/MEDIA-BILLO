<?php
require('./db.class.php');
require('./UserResponse.php');
require('./Ticket.php');

$smsdata = array(
    'recipient_number' => '233' . ltrim('0504620913', "0"),
    'msg_body' => "Your pin is " . "43434",
    'unique_id' => "BIOLTEST".rand(100000,999999). 'SM1',
    'trans_type' => 'SMS',
    'sender_id' => "MEDIABILO-TICKETSs",
    'service_id' => 571,
    'msg_type' => "T",
);
Ticket::sendSMS($smsdata);
?>