<?php
error_reporting(0);
 header('Content-type: application/json');

header('Access-Control-Allow-Origin: *'); 
require('./verify_login.php');

require 'connection.php';
//check if previous table name is set
if (!empty($_POST['prev_name'])) {
    $prev_name = $_POST['prev_name'];
 
   
    $error_characters = [' ', '\n'];
    $character_replace = ['_', ' '];
    $prev_table = trim(strtoupper(str_replace($error_characters, $character_replace, $prev_name)));
    //check if file exist
    if(file_exists($_FILES['file']['tmp_name']) || is_uploaded_file($_FILES['file']['tmp_name'])) {    
         
         $file = $_FILES['file']['tmp_name'];

        $file_name = $_FILES['file']['name'];

        try {
            $img_path = "./Images/EventImages/" . $file_name;
            $path_db = "/Images/EventImages/" . $file_name;
            move_uploaded_file($file, $img_path);

            $event_staus = 'inactive';
            $qry = "UPDATE billo_event SET image_url=? WHERE event_name=?";
            $stmt3 = $connection->prepare($qry);
            $res = $stmt3->execute([$path_db, $prev_table]);
        } catch (PDOException $e) {
            http_response_code(500);
         //  echo "error " . $e->getMessage();
            die();
        } 
    }
    else{
       
    }

    if (!empty($_POST['new_name'])) {
        $new_name = $_POST['new_name'];
        $new_table = trim(strtoupper(str_replace($error_characters, $character_replace, $new_name)));
        $sql1 = "UPDATE billo_event SET event_name=? WHERE event_name=?;
           ALTER TABLE $prev_table RENAME $new_table
            ";
        $sql2 = "RENAME $prev_table TO $new_table";
        try {
            $stmt = $connection->prepare($sql1);
            $stmt->execute([$new_table, $prev_table]);
          
        } catch (PDOException $e) {
            http_response_code(500);
           // echo "error " . $e->getMessage();
            die();
        }
    }
   
}
