<?php
header('Content-type: Application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require('../../db.class.php');
require('../TicketCategories.php');
require('../../UserResponse.php');
$error_handler = 'showError';
db::$error_handler = $error_handler;
db::$nonsql_error_handler = $error_handler;


$data = json_decode(file_get_contents('php://input'));
$eventid = $data->event_id;
$categories = $data->categories;
foreach ($categories as $category) {
   $item = new TicketCategories;
   $item->category_name = $category->name;
   $item->category_price = $category->price;
   $item->category_id = "MBCA-".rand(100000,999999);
   $item->event_id = $eventid;
   $item->createCategories();
}
UserResponse::displayMessage(200,'Categories Added succesfylly');

function showError($msg){
    UserResponse::displayMessage(500, $msg['error']);
}