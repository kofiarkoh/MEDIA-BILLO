<?php

header('Content-type: Application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require('../../db.class.php');
require('../TicketEvent.php');
require('../../UserResponse.php');

$name = strtoupper($_POST['name']);
$id = 'MBE-'.rand(100000,999999);
$multi_ticket = $_POST['multi'];
$price = $_POST['price'];

$d = 'showError';

db::$error_handler = $d;
db::$nonsql_error_handler = $d;


$event = new TicketEvent;
$event->name = $name;
$event->event_id = $id;
$event->multi_ticket = $multi_ticket;
$event->price = $price;
$event->createEvent();

 function showError($msg){
    UserResponse::displayMessage(500, $msg['error']);
}