<?php
header('Content-type: Application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require('../../db.class.php');
require('../TicketEvent.php');
require('../../UserResponse.php');
$events = TicketEvent::getTicketEvents();
$resp = [];
try {
  // $active_events = DB::query("SELECT COUNT(event_id) as active from ticket_events");
    $active_events = 0;
    $total_sales = 0;
  foreach($events as $event){
        $ticket_sold =  DB::query("SELECT COUNT(event_id) as tickets_sold from ticket_transactions WHERE event_id=%s",$event['event_id']);
        if($event['status'] == 'active'){
            $active_events += 1;
        }
        $event['tickets_sold'] = $ticket_sold[0]['tickets_sold'];
        if($event['multi_ticket'] == 'false'){
            $event['amount_earned'] = $event['tickets_sold']*$event['price'];
            $total_sales +=  $event['amount_earned'] ;
        } else{
            $amount_earnd =  DB::query("SELECT SUM(price) as price from ticket_transactions WHERE event_id=%s",$event['event_id']);
            $event['amount_earned'] =  $amount_earnd[0]['price'];
            $total_sales +=   $event['amount_earned'] ;
        }
       array_push($resp,$event);
    }
    $resp_data =array(
        'active_events' =>$active_events,
        'num_events' => count($events),
        'sales'=>$total_sales,
        'stats'=>$resp
    );
    UserResponse::displayMessage(200,$resp_data);
} catch (\Throwable $th) {
    //throw $th;
    UserResponse::displayMessage(500,$th->getMessage());
}


