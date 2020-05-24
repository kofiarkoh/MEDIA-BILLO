<?php
$id = $_POST['id'];
$event_name = $_POST['event_name'];
$message = '';
require('connection.php');
$sql = "SELECT image_path FROM $event_name WHERE id= '$id'";
$stmt  = $connection->prepare($sql);
$stmt->execute();
$res= $stmt->fetchAll(PDO::FETCH_ASSOC);
$image_path = $res[0]['image_path'];
//print_r($res);
//echo $image_path;
    $query = "DELETE FROM $event_name WHERE id = '$id'";
$res = $connection->exec($query);
if ($res !== false){
   unlink('.'.$image_path);
   $message = 'Contestant Has Been Succesfuly Removed';
}
else {
    $message = 'An error has occured';
} 
$response = array(
    'messsage'=>$message
);
echo json_encode($response);
?>