<?php 

function geteventsSummary(){
    global $connection;
    $num_events = $connection->query("SELECT COUNT(*) FROM billo_event ")->fetchColumn();
    $active_events = $connection->query("SELECT COUNT(*) FROM billo_event WHERE status='active' ")->fetchColumn();
    
    //---------TOTAL VOTES START--------------//
    $sql = "SELECT * FROM billo_event";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $votes = [];
    foreach($events as $event){
        $eventItem =  $event['event_name'];
        $name = str_replace("_"," ",$eventItem);
        $numvotes = getTotalVotes($eventItem);
        array_push($votes,$numvotes);
    }
    $total_votes = array_sum($votes);
//------------ TOTAL VOTES END--------------//

$response  = array(
    'num_events' => $num_events,
    'active_events'=> $active_events,
    'funds'=> $total_votes*0.6 );
    return $response;
//echo json_encode($response);
}


function getTotalVotes($event_name) {
    global $connection;
    $table_name = $event_name;
    $sql = "SELECT SUM(votes) FROM $table_name";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $res[0]['SUM(votes)'];
}

?>