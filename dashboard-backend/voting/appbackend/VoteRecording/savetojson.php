<?php
header('Content-type:application/json');
$data =  array("name"=>'lawrence');
echo json_encode($data);
saveFile($data);

function saveFile($data)
{
    $fp = fopen('./webhookresponses/results.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

}
