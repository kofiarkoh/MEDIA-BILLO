<?php
$error_handler = 'showError';
db::$error_handler = $error_handler;
db::$nonsql_error_handler = $error_handler;

function showError($msg){
    UserResponse::displayMessage(500, $msg);
}
?>