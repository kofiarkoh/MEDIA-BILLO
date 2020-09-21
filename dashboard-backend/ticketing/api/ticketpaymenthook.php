<?php
require('../db.class.php');
require('../UserResponse.php');
require('../Ticket.php');
$data = json_decode(file_get_contents('php://input'));

$trans_id = $data->trans_ref;
$message = $data->message;
$status = $data->trans_status;
if ($status == "000/01" || $message == 'Success' || $message == "SUCCESS") {
    //update transaction status
    /* DB::update('ticket_transactions',[
        'payment_status' => 'completed'
    ],'trans_id=%s',$trans_id);
 */
    //get ticket id's associated with this transaction
    $tickets = DB::query("SELECT * FROM ticket_transactions WHERE trans_id=%s",$trans_id);
    $phone_number = $tickets[0]['phonenumber']; //one phone number for all tickets
    $ticket_ids = [];
    foreach($tickets as $ticket){
        array_push($ticket_ids,$ticket['ticket_id']);
    }
    $ticket_ids = implode(" , ",$ticket_ids);

    //send sms with ticket ids to user
    $smsdata = array(
        'recipient_number' => '233' . ltrim($phone_number, "0"),
        'msg_body' => "Booking successfull.Your ticket(s) is/are ".$ticket_ids.'Thanks for your patronage',
        'unique_id' => $trans_id . 'SM2',
        'trans_type' => 'SMS',
        'sender_id' => "MEDIABILO-TICKETS",
        'service_id' => 571,
        'msg_type' => "T",
    );
    Ticket::sendSMS($smsdata);
  //  UserResponse::displayMessage(200, $ticket_ids);

} else {
    //mark payment status as failed
    DB::update('ticket_transactions',[
        'payment_status' => 'failed'
    ],'trans_id=%s',$trans_id);
}
