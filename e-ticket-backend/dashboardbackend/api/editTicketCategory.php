<?php
header('Content-type: Application/json');
require('../../db.class.php');
require('../TicketCategories.php');
require('../../UserResponse.php');
$error_handler = 'showError';
db::$error_handler = $error_handler;
db::$nonsql_error_handler = $error_handler;


$id = $_POST['id'];
$new_name = $_POST['new_name'];
$new_price = $_POST['new_price'];
$sold_out = $_POST['sold_out'];

TicketCategories::editCategory($id,$new_name,$new_price,$sold_out);
function showError($msg){
    UserResponse::displayMessage(500, $msg['error']);
}