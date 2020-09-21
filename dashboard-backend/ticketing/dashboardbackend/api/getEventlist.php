<?php
require './verify_login.php';

require('../../db.class.php');
require('../TicketEvent.php');
require('../../UserResponse.php');

//get the media billo event which are yet to sell tickets
TicketEvent::getEvents();