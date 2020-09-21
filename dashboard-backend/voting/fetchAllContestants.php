<?php
require('./cors_headers.php');


require('./connection.php');
$sql = "SELECT * FROM billo_event";
$stmt = $connection->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
$data = addSpaceCharacter($res);

$response = [];
//echo json_encode($data);//json_encode($data);
foreach($res as $event){
    $eventItem =  $event['event_name'];
    $name = str_replace("_"," ",$eventItem);
    $contestants = getContestants($eventItem);
    $event_array = array(
        "eventname"=> $name,
        "contestants"=> $contestants
    );
    array_push($response,$event_array);
}
echo json_encode($response);
function getContestants($event_name) {
    global $connection;
   // $event_name = $_POST['event_name'];
$table_name = $event_name;//str_replace(' ','_',$event_name);
$sql = "SELECT * FROM $table_name";
$stmt = $connection->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
return $res;
//echo json_encode($res);
}

function addSpaceCharacter($dataa) {
    //$content = $data
    $n = 0;
    for ($i=0;$i<=count($dataa)-1;$i++) {
        $n++;
       // echo $dataa[$i]['event_name']; 
        $dataa[$i]['event_name'] = str_replace('_',' ',$dataa[$i]['event_name']);
    }
    return $dataa;
}
?>