<?php
require './connection.php';
require './vendor/autoload.php';
use Firebase\JWT\JWT;

$secret_key = "mbillo";
$jwt = null;

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
$arr = explode(" ", $authHeader);
$jwt = $arr[1];

try {
    JWT::$leeway = 5;

    $decoded = JWT::decode($jwt, $secret_key, array('HS256'));

} catch (Exception $e) {
    //access denied
    displayResponse(401, "Access denied...");

}