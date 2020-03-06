<?php
require('./verify_login.php');

/* header('Content-type: application/json');
header('Access-Control-Allow-Origin: *'); */
//header('Access-Control-Allow-Headers: X-Requested-With');

require('./connection.php');
$sql = "SELECT * FROM billo_event";
$stmt = $connection->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
//$data = addSpaceCharacter($res);

$response = [];
//echo json_encode($data);//json_encode($data);
foreach($res as $event){
    $eventItem =  $event['event_name'];
    $name = str_replace("_"," ",$eventItem);
    $eventVotes = getVotes($eventItem);
    $votes = $eventVotes[0];
    $event_array = array(
        "eventname"=> $name,
        "totalvotes"=>  $votes === null ? 0 : $votes,
        "amount"=> "GHS ".round($votes*0.6,2),
       "numContestants"=>$eventVotes[1]
    );
    array_push($response,$event_array);
}
echo json_encode($response);

function getVotes($event_name) {
    global $connection;
   // $event_name = $_POST['event_name'];
$table_name = $event_name;//str_replace(' ','_',$event_name);
$sql = "SELECT SUM(votes) FROM $table_name";    
$stmt = $connection->prepare($sql);
$stmt->execute();

$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
$nrows = $connection->query("SELECT COUNT(*) FROM $table_name")->fetchColumn();
return [$res[0]['SUM(votes)'],$nrows];
//echo json_encode($res);=== null ? 0
}

function countRows() {
    global $connection;
   $table_name = $event_name;//str_replace(' ','_',$event_name);
   $sql = "SELECT SUM(votes) FROM $table_name";    
   $stmt = $connection->prepare($sql);
   $stmt->execute();
   $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
   return $res[0]['SUM(votes)'];
}
?>