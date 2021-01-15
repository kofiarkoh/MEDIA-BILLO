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
$app_version = checkNewAppVersion();
$response = array(
    'polls' => $data,
    'app_version' => $app_version
    );
echo json_encode($response);//json_encode($data);

function addSpaceCharacter($data) {
    //$content = $data
    $n = 0;
    for ($i=0;$i<=count($data)-1;$i++) {
        $n++;
       // echo $dataa[$i]['event_name']; 
        $data[$i]['event_name'] = str_replace('_',' ',$data[$i]['event_name']);
        $data[$i]['price'] = 0.5;
    }
    return $data;
}

function checkNewAppVersion(){
    
    return 5;
}
?>