<?php
require './headers.php';

$id = $_POST['id'];
$status = $_POST['status'];

try {
    //
    DB::update('applications',[
        'status'=> $status
    ],'id=%s',$id);
    $applicant = DB::queryFirstRow("SELECT * FROM applications WHERE id=%s", $id);    
    UserResponse::displayMessage(200,$applicant);
} catch (\Throwable $th) {
    //throw $th;
    UserResponse::displayMessage(500,$th->getMessage());
}
