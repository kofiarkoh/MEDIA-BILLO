<?php
require('../db.class.php');
require('../dberrorhandler.php');
require('../UserResponse.php');
require('../dashboardbackend/TicketEvent.php');
require('../dashboardbackend/TicketCategories.php');
$events = TicketEvent::getTicketEvents();

$resp = [];
 foreach($events as $event){
    $categories = TicketCategories::getEventCategory($event['event_id']);
    $event['categories'] = $categories;
   array_push($resp,$event);
} 
UserResponse::displayMessage(200,$resp);