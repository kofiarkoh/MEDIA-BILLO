<?php
//error_reporting(0);
header('Content-type: application/json');
 header('Content-type: application/json');

header('Access-Control-Allow-Origin: *'); 
require('./verify_login.php');

require 'connection.php';
//check if previous table name is set
$message = "";
if (!empty($_POST['event_name'])) {
    $event_name = $_POST['event_name'];
    $id = $_POST['id'];
    $error_characters = [' ', '\n'];
    $character_replace = ['_', ' '];
    $event_table = trim(strtoupper(str_replace($error_characters, $character_replace, $event_name)));
    //check if file exist
    if(file_exists($_FILES['file']['tmp_name']) || is_uploaded_file($_FILES['file']['tmp_name'])) {    
        echo 'will edit photo';
        $file = $_FILES['file']['tmp_name'];

        $file_name = $_FILES['file']['name'];

        try {
            $img_path = "./Images/" . $file_name;
            $path_db = '/Images/' . $file_name;
            move_uploaded_file($file, $img_path);

            $event_staus = 'inactive';
            $qry = "UPDATE $event_table SET image_path=? WHERE id=?";
            $stmt3 = $connection->prepare($qry);
            $res = $stmt3->execute([$path_db, $id]);
            
        } catch (PDOException $e) {
            http_response_code(500);
          //  echo "error " . $e->getMessage();
            die();
        }
    }else{
       // echo "no p";
    }

    //update corresponding table with new name
    if (!empty($_POST['new_name'])) {
        $new_name = $_POST['new_name'];
        
        $sql1 = "UPDATE $event_table SET contestant_name=? WHERE id=?";
       
        try {
            $stmt = $connection->prepare($sql1);
            $stmt->execute([$new_name, $id]);
            echo "success";
        } catch (PDOException $e) {
            http_response_code(500);
            //echo "error " . $e->getMessage();
            die();
        }
    }
}
