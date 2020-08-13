<?php
class TicketEvent extends DB
{
    public $name;
    public $event_id;
    public $multi_ticket;
    public $price;
    public $status = 'inactive';

    public function createEvent()
    {
        try {
      
            DB::$user = 'root';
            db::$password = '';
            db::$dbName = 'media_billo';
          
            $event_exists = DB::query("SELECT * FROM ticket_events WHERE event_name=%s_name",
        [
            'name'=>$this->name
        ]);
            if(empty($event_exists)) {
                DB::insert('ticket_events',[
                    'event_name'=>$this->name,
                    'event_id'=>$this->event_id,
                    'multi_ticket' => $this->multi_ticket,
                    'price'=>$this->price,
                    'status'=>$this->status
                ]);
                UserResponse::displayMessage(200,'Event added succesfully');

            } else{
                UserResponse::displayMessage(400,"Event Already Exists");
            }
           
            
     
        } catch (\Throwable $th) {
            UserResponse::displayMessage(500, $th->getMessage());
        }
       
    }

    static function getTicketEvents(){
        try {
            //code...
            $events = DB::query("SELECT * from ticket_events");
            //UserResponse::displayMessage(200,$events);
            return $events;
        } catch (\Throwable $th) {
           UserResponse::displayMessage(500,$th->getMessage());
        }
    }
    static function testm(){
        try {
            //code...
            $events = DB::query("SELECT * from ticket_events LEFT JOIN ticket_categories  ON ticket_events.event_id = ticket_categories.event_id");
            UserResponse::displayMessage(200,$events);
        } catch (\Throwable $th) {
           UserResponse::displayMessage(500,$th->getMessage());
        }
    }
    static function getEvents(){
        
        try {
            //code...
            $events = DB::query("SELECT * from billo_event");
            UserResponse::displayMessage(200,$events);
        } catch (\Throwable $th) {
           UserResponse::displayMessage(500,$th->getMessage());
        }
    }
    public static function editEvent($id,$new_name,$price,$multi_ticket){
        DB::$user = 'root';
        db::$password = '';
        db::$dbName = 'media_billo';
      
        try {
            DB::update('ticket_events',
        [
            'price'=>$price,
            'event_name'=>$new_name,
            'multi_ticket'=>$multi_ticket
        ], "event_id=%s",$id);
        UserResponse::displayMessage(200,'Update applied succesfully');
        } catch (\Throwable $th) {
            //throw $th;
            UserResponse::displayMessage(500,$th->getMessage());
        }
    }

}
