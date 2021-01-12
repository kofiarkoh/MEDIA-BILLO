<?php
require './cors_headers.php';
require 'connection.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    displayResponse(400,'Method Not Allowed');
}
//check if previous table name is set
$message = "";
if (!empty($_POST['event_name'])) {
    $event_name = $_POST['event_name'];
    $id = $_POST['id']; //id of contestant
    $error_characters = [' ', '\n'];
    $character_replace = ['_', ''];
    $event_table = trim(strtoupper(str_replace($error_characters, $character_replace, $event_name)));
    //check if file exist
    if(isset($_FILES['file']) !== false) {    
  //      if(isset($_FILES['file']) || file_exists($_FILES['file']['tmp_name']) || is_uploaded_file($_FILES['file']['tmp_name'])) {    
      
        $file = $_FILES['file']['tmp_name'];

        $file_name = $_FILES['file']['name'];
        $file_name = str_replace(' ','_',$file_name);
        try {
            $img_path = "./Images/" . $file_name;
            $path_db = 'http://admin.mediabillo.net/backend/voting/Images/' . $file_name;
            move_uploaded_file($file, $img_path);

            $event_staus = 'inactive';
            $qry = "UPDATE $event_table SET image_path=? WHERE id=?";
            $stmt3 = $connection->prepare($qry);
            $res = $stmt3->execute([$path_db, $id]);
            
        } catch (PDOException $e) {
            http_response_code(500);
            displayResponse(500,$e->getMessage());
            
        }
    }else{
       //no file uploaded
    }

    //update corresponding table with new name
    if (!empty($_POST['new_name'])) {
        $new_name = $_POST['new_name'];
        
        $sql1 = "UPDATE $event_table SET contestant_name=? WHERE id=?";
       
        try {
            $stmt = $connection->prepare($sql1);
            $stmt->execute([$new_name, $id]);
           
        } catch (PDOException $e) {
            http_response_code(500);
            //echo "error " . $e->getMessage();
            displayResponse(500,$e->getMessage());
            
        }
    }
}
displayResponse(200,'Update Applied Succesfully');
