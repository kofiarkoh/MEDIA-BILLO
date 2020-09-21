<?php
require './verify_login.php';

require('../../db.class.php');
require('../TicketEvent.php');
require('../TicketCategories.php');
require('../../UserResponse.php');
$error_handler = 'showError';
db::$error_handler = $error_handler;
db::$nonsql_error_handler = $error_handler;


$id = $_GET['id'];
$status = $_GET['status'];

try {
    DB::update('ticket_events',['status'=>$status],"event_id=%s",$id);
    UserResponse::displayMessage(200,'Changes applied succesfully');

} catch (\Throwable $th) {
    //throw $th;
    UserResponse::displayMessage(500,$th->getMessage());
}

//TicketEvent::editEvent($id,$new_name,$new_price,$multi_ticket);
function showError($msg){
    UserResponse::displayMessage(500, $msg['error']);
}