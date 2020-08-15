<?php
header('Content-type: Application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require('../../db.class.php');
require('../TicketEvent.php');
require('../../UserResponse.php');
require('../TicketCategories.php');
$events = TicketEvent::getTicketEvents();
$resp = [];
try {
  // $active_events = DB::query("SELECT COUNT(event_id) as active from ticket_events");
    $active_events = 0;
    $total_sales = 0;
  foreach($events as $event){
      
        //$event['tickets_sold'] = $ticket_sold[0]['tickets_sold'];
        if($event['multi_ticket'] == 'true'){
          //eventname  
            $categories = TicketCategories::getEventCategory($event['event_id']);
            $cat_arr = [];
            foreach ($categories as $category) {
                # code...
                $ticket_sold =  DB::query("SELECT COUNT(event_id) as tickets_sold from ticket_transactions WHERE ticket_category_id=%s AND payment_status='completed'",$category['category_id']);
                $cat = array(
                    'category_id' => $category['category_id'],
                    'category_name' => $category['category_name'],
                    'is_sold_out'=>$category['is_sold_out'],
                    'tickets_sold' => $ticket_sold[0]['tickets_sold'],
                    'price'=>$category['price']
                );
                array_push($cat_arr,$cat);
            }
            $item = array(
                'event_name'=>$event['event_name'],
                'categories'=>$cat_arr
            );
            array_push($resp,$item);
        }
      
    }
    $resp_data =array(
        'active_events' =>$active_events,
        'num_events' => count($events),
        'sales'=>$total_sales,
        'stats'=>$resp
    );
    UserResponse::displayMessage(200,$resp);
} catch (\Throwable $th) {
    //throw $th;
    UserResponse::displayMessage(500,$th->getMessage());
}


