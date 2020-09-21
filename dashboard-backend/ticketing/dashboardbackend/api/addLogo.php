<?php
require './verify_login.php';

$eventid = $_POST['eventid'];
$tmp_name = $_FILES['photo']['tmp_name'];
$file_ext = $_FILES['photo']['type'];
try {
    //code...
    move_uploaded_file($tmp_name,'../ticketlogos/'.$eventid.'.jpg'); //basename($_FILES['photo']['name']));
    echo json_encode(array(
        'resp_code'=> 200,
        'message' => 'File uploaded succesfully'
    ));
} catch (\Throwable $th) {
    //throw $th;
    echo json_encode(array(
        'resp_code'=> 200,
        'message' => $th->getMessage()
    ));
}
?>