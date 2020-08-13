<?php
header('Content-type: Application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require('../db.class.php');
require('../UserResponse.php');
require('../Ticket.php');
require('../dberrorhandler.php');
 $phone = $_POST['phone'];
 $eventid = $_POST['eventid'];
// $ticketid = "BILO".rand(100000,999999)."T"; //
 $trans_date = date('Y-m-d H:i:s');
 $trans_id = "MBT-".(time()+5020);
 $trans_ref = 'MEDIA BILLO - TICKETS';
 $ntwk_type = $_POST['ntwkType'];
 $otp = rand(100000,999999);
 $ticket_status = 'pending';
 $ticketCategoryId = $_POST['cat_id'];
 $numTickets = $_POST['numTickets'];
 $price = $_POST['price'];

 $item= new Ticket;
 $item->phone = $phone;
 $item->eventid = $eventid;
 $item->trans_date = $trans_date;
 $item->trans_id = $trans_id;
 $item->ntwk_type = $ntwk_type;
 $item->otp = $otp;
 $item->ticket_status = $ticket_status;
 $item->ticketCategoryId = $ticketCategoryId;
 $item->numTickets = $numTickets;
 $item->price = $price;
 $item->saveRequest();
/* for ($i=0; $i < $numTickets; $i++) { 
    $ticketid = "BILO".rand(100000,999999)."T"; // generate ticket id for each person but with same transaction details


    $item= new Ticket;
    $item->phone = $phone;
    $item->eventid = $eventid;
    $item->trans_date = $trans_date;
    $item->trans_id = $trans_id;
    $item->ntwk_type = $ntwk_type;
    $item->otp = $otp;
    $item->ticket_status = $ticket_status;
    $item->ticketCategoryId = $ticketCategoryId;
} */