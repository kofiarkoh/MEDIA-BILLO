<?php
require './headers.php';
require './SMSHandler.php';

$id = $_POST['id'];
$status = $_POST['status'];

try {
    //
    DB::update('applications', [
        'status' => $status
    ], 'id=%s', $id);
    $applicant = DB::queryFirstRow("SELECT * FROM applications WHERE id=%s", $id);

    if ($applicant['status'] == 'Approved') {
       
        //send sms notification to applicant 
        $first_name = explode(' ', $applicant['applicant_name'])[0];
        $sms_data = generateSMSData($applicant['phone'], $first_name, $applicant['project_name']);
        SMSHandler::sendSMS($sms_data);
    }

    UserResponse::displayMessage(200, $applicant);
} catch (\Throwable $th) {
    //throw $th;
    UserResponse::displayMessage(500, $th->getMessage());
}

function generateSMSData($phone, $name, $event_name)
{
    $msg = "Hi " . $name . ', Your application for ' . $event_name . ' has been approved.Contact 0240042313 for enquiry and follow us on all our social media handles.Thanks';
    $smsdata = array(
        'recipient_number' => '233' . ltrim($phone, "0"),
        'msg_body' => $msg,
        'unique_id' => 'MBA' . rand(100000, 999999),
        'trans_type' => 'SMS',
        'sender_id' => "MB-AP",
        'service_id' => 571,
        'msg_type' => "T",
        'len' => strlen($msg)
    );

    return $smsdata;
   
}
