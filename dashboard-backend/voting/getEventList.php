<?php


error_reporting(0);
require './cors_headers.php';

  $sql = "SELECT * FROM billo_event";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $data = addSpaceCharacter($res);
    
    //echo json_encode($data);//json_encode($data);
    displayResponse(200,$data);



    function addSpaceCharacter($dataa) {
        //$content = $data
        $n = 0;
        for ($i=0;$i<=count($dataa)-1;$i++) {
            $n++;
         
            $dataa[$i]['event_name'] = str_replace('_',' ',$dataa[$i]['event_name']);
        }
        return $dataa;
    }
 

?>