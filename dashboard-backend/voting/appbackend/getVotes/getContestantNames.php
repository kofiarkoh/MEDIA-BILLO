<?php
function getNames($table_name){
    global $connection;
    $event_name = $_POST['event_name'];
    $table_name = str_replace(' ','_',$event_name);
    $sql = "SELECT contestant_name FROM $table_name";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_NUM);
    $names= [];
    for ($i=0;$i<=(count($res)-1);$i++){
       // array_push($names,$res[$i][$i]);
       array_push($names,$res[$i][0]);
    }
    return $names;
}
function getVotes($table_name){
    global $connection;
    $event_name = $_POST['event_name'];
    $table_name = str_replace(' ','_',$event_name);
    $sql = "SELECT votes FROM $table_name";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_NUM);
    $votes= [];
    for ($i=0;$i<=(count($res)-1);$i++){
       // array_push($names,$res[$i][$i]);
       array_push($votes,$res[$i][0]);
    }
    return $votes;   
}

?>