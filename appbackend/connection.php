<?php 

try{
    $connection= new PDO('mysql:host=localhost;dbname=mediabil_events','mediabil','m=B2P#19f%8vh');
    $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
       
    
}
catch(PDOException $e) {
    http_response_code(500);
    echo 'Database connection failed '.$e->getMessage();
    die();
}
?>