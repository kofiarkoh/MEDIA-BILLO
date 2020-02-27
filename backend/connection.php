<?php 
try{
    $connection= new PDO('mysql:host=localhost;dbname=media_billo','root','');
    $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        
    
}
catch(PDOException $e) {
    echo 'Database connection failed '.$e->getMessage();
    die();
}
?>