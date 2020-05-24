<?php
require('../connection.php');
require('./getContestantNames.php');
$event_name = $_POST['event_name'];
$table_name = str_replace(' ','_',$event_name);
$names = getNames($table_name);
$votes = getVotes($table_name);
$data = array(
    "labels"=>$names,
    'votes'=>$votes
);
echo json_encode($data);
?>