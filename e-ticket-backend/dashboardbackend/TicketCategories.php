<?php
class TicketCategories{
    public $event_id;
    public $category_id;
    public $category_name;
    public $category_price;
    public $is_sold_out = "false";

    public function createCategories(){
       /*  DB::$user = 'root';
        db::$password = '';
        db::$dbName = 'media_billo';  */
        try {
            DB::insert('ticket_categories',[
                'event_id'=>$this->event_id,
                'category_id'=>$this->category_id,
                'category_name' => $this->category_name,
                'price'=>$this->category_price,
                'is_sold_out' => $this->is_sold_out
            ]);
           
           
        } catch (\Throwable $th) {
            //throw $th;
            UserResponse::displayMessage(500,$th->getMessage());
        }
    }

    public static function editCategory($id,$new_name,$price,$sold_out){
      /*   DB::$user = 'root';
        db::$password = '';
        db::$dbName = 'media_billo'; */
      
        try {
            DB::update('ticket_categories',
        [
            'price'=>$price,
            'category_name'=>$new_name,
            'is_sold_out'=>$sold_out
        ], "category_id=%s",$id);
        UserResponse::displayMessage(200,'Update applied succesfully');
        } catch (\Throwable $th) {
            //throw $th;
            UserResponse::displayMessage(500,$th->getMessage());
        }
    }
    static function getEventCategory($event_id){
        try {
            //code...
            $cat = DB::query("SELECT * from ticket_categories WHERE event_id=%s",$event_id);
            return $cat;
        } catch (\Throwable $th) {
           UserResponse::displayMessage(500,$th->getMessage());
        }
    }
}