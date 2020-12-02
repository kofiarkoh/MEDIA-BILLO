<?php
require './headers.php';
function getApplications(){
    try {
        $list = DB::query('SELECT * FROM applications ORDER BY project_name ASC');
      
        UserResponse::displayMessage(200,$list);

    } catch (\Throwable $th) {
        
        UserResponse::displayMessage(500,$th->getMessage());
        //throw $th;
    }
}

getApplications();
?>