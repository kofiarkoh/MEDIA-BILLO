<?php
require './verify_login.php';


require('../../db.class.php');
require('../TicketEvent.php');
require('../TicketCategories.php');
require('../../UserResponse.php');
$error_handler = 'showError';
db::$error_handler = $error_handler;
db::$nonsql_error_handler = $error_handler;


$id = $_POST['id'];
$new_name = $_POST['new_name'];
$new_price = $_POST['new_price'];
$multi_ticket = $_POST['multi_ticket'];

TicketEvent::editEvent($id,$new_name,$new_price,$multi_ticket);
function showError($msg){
    UserResponse::displayMessage(500, $msg['error']);
}