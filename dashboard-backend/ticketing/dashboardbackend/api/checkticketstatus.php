<?php
require './verify_login.php';

require('../../db.class.php');

require('../../UserResponse.php');
$error_handler = 'showError';
db::$error_handler = $error_handler;
db::$nonsql_error_handler = $error_handler;


$id = $_GET['id'];
try {
    //code...
    $ticket = DB::queryFirstRow("SELECT * FROM ticket_transactions WHERE ticket_id=%s",$id);
    if(empty($ticket)){
        UserResponse::displayMessage(404,'Ticket ID not found');
    } else{
        if($ticket['payment_status'] !== 'completed'){
            UserResponse::displayMessage(500,'This Ticket has not been paid for...');
        } else{
            if($ticket['ticket_status'] == 'pending') {
                //ticket has not been used
                //mark it has used
                DB::update('ticket_transactions',['ticket_status'=>'used'],"ticket_id=%s",$id);
                $event_name = DB::queryFirstRow("SELECT event_name FROM ticket_events WHERE event_id=%s",$ticket['event_id']);
                $response = array(
                    'event_name' => $event_name['event_name'],
                    'description'=>'Verification successful'
                );
                UserResponse::displayMessage(200,$response);
            } else{
                UserResponse::displayMessage(401,'Ticket has been used');
            }
        }

       
    }
    
} catch (\Throwable $th) {
    //throw $th;
    UserResponse::displayMessage(500,$th->getMessage());
}

function showError($msg){
    UserResponse::displayMessage(500, $msg['error']);
}