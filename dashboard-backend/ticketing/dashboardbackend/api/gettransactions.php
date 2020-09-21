<?php
require './verify_login.php';

require '../../db.class.php';
require '../../UserResponse.php';
$id = $_GET['id'];

try {
    //code...
    $transactions = DB::query("SELECT * FROM ticket_transactions WHERE event_id=%s",$id);
    $arr = [];
    foreach($transactions as $trans){
        $cat_name =  DB::query("SELECT category_name FROM ticket_categories WHERE category_id=%s",$trans['ticket_category_id']);
        $trans['cat_name'] = $cat_name[0]['category_name'];
        array_push($arr,$trans);
    }
    UserResponse::displayMessage(200, $arr);

} catch (\Throwable $th) {
    //throw $th;
    UserResponse::displayMessage(500, $th->getMessage());
}
?>
