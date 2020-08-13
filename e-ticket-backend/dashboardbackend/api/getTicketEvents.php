<?php
header('Content-type: Application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require('../../db.class.php');
require('../TicketEvent.php');
require('../../UserResponse.php');

//get the media billo event which are yet to sell tickets
TicketEvent::getTicketEvents();