<?php
/* header('Content-type: application/json');
header('Access-Control-Allow-Origin: *'); */
//require './verify_login.php';

require './cors_headers.php';
$name = $_POST['name'];
$event_name = str_replace(" ", "_", $_POST['event_name']);
$file = $_FILES['file']['tmp_name'];
$message = '';
$code = 200;
$file_name = $_FILES['file']['name'];
$file_name = str_replace(' ','_',$file_name);
$result = move_uploaded_file($file, "./Images/" . $file_name);
if ($result == 1) {

    //  echo "Image upload successful" ;
    require 'connection.php';
//Check if the contestant exists
    $nrows = $connection->query("SELECT COUNT(*) FROM $event_name WHERE contestant_name = '$name' ")->fetchColumn();
    if ($nrows > 0) {
        //delete the image if name already exists.
        unlink('./Images/' . $file_name);
        $code = 500;
        $message = "contestant already exists...";
    } else {
        //if contestant does not exist!
        //insert the name into database
        $image_path = '/Images/' . $file_name;
        $image_path_db ='http://admin.mediabillo.net/backend/voting/Images/'.$file_name;
        $qry = "INSERT INTO $event_name (contestant_name,votes,image_path) VALUES ('$name',0,'$image_path_db')";
        $result = $connection->exec($qry);
        if ($result !== false) {
            // $status += 1;
            //  "name insert succesfull"
            $message = 'Contestant has been succesfully added';
        } else {

            //delete the image if name insertion fails.
            unlink('./Images/' . $file_name);
            $code = 500;
            $message = "Name insertion was not succesful. please try again...";
        }
    }
} else {
    $code = 500;
    $message = "Image Upload Unsuceesfull, please try again..";
}

$response = array(
    'message' => $message,
);
displayResponse($code,$message);
//echo json_encode($response);
