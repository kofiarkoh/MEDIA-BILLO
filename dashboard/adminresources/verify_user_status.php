<?php
header('Access-Control-Allow-Origin: *');
session_start();
if ($_SESSION['status'] == 'nonadmin') {
    http_response_code(401);
    echo json_encode(array("message"=>"Only super admins are allowed to make changes"));
    die();
}
?>