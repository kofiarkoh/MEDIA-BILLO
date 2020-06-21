<?php
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Headers: X-Requested-With');

require('./connection.php');
$sql = "SELECT * FROM billo_event WHERE status='active'";
$stmt = $connection->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
$data = addSpaceCharacter($res);

echo json_encode($data);//json_encode($data);

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