<?php
class Ticket extends DB
{
    public $phone;
    public $eventid;
    public $ticketid;
    public $trans_date;
    public $trans_id;
    private $trans_ref = 'MEDIA BILLO - TICKETS';
    public $ntwk_type;
    public $otp;
    public $ticket_status;
    public $ticketCategoryId; //the id of the ticket category on the assigned event, should be 'none' for event with no multiple ticket categories
    public $numTickets;
    public $price;
    public function saveRequest()
    {
        try {
          
            for ($i=0; $i <$this->numTickets ; $i++) { 
                # code...
                DB::insert('ticket_transactions', [
                    'phonenumber' => $this->phone,
                    'event_id' => $this->eventid,
                    'ticket_id' =>  "BILO".rand(100000,999999)."T",
                    'ticket_category_id' => $this->ticketCategoryId,
                    'trans_date' => $this->trans_date,
                    'trans_id' => $this->trans_id,
                    'trans_ref' => $this->trans_ref,
                    'ntwk_type' => $this->ntwk_type,
                    'price'=>$this->price,
                    'otp' => $this->otp,
                    'otp_status'=>'pending',
                    'ticket_status' => $this->ticket_status,
                ]);
            }
           
            $this->sendOtp();
        } catch (\Throwable $th) {
            //throw $th;
            UserResponse::displayMessage(500, $th->getMessage());
        }

    }

    public static function sendSMS($sms_data)
    {
        $service_id = 571;
        $base_url = 'https://orchard-api.anmgw.com';
        $client_key = 'edZf2oxWaijXXVj5ToHScyzB7gU51RDGeMi8LqxwOZ6/sH+G1qhUGoIAX3RwbZqo/47dHdtfzd6/C1+S7MW6KA==';
        $secrete_key = 'hja3WVEdB5bAQWYhhi2dPzTVx3Ppv9ydlJooZQU3sN6/MF56vZTipp7VtMScwfZZXODwGXuz4AEXT+ILIxlV5g==';
        try {

          /*   $body = json_encode($sms_data);
            $signature = hash_hmac('sha256', $body, $secrete_key);
            $auth = 'Authorization: ' . $client_key . ':' . $signature;
            $ch = curl_init($base_url . '/sendSms');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
            // Set HTTP Header for POST request
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Authorization: ' . $client_key . ':' . $signature,
            ));
            $transactionult = curl_exec($ch); */
            //echo $transactionult;
            UserResponse::displayMessage(200,$sms_data['msg_body']);
        } catch (Exception $e) {
            //echo $e->getMessage();
            UserResponse::displayMessage(500,$e->getMessage());
        }
       // curl_close($ch);
    }
    public function sendOtp()
    {

        $smsdata = array(
            'recipient_number' => '233' . ltrim($this->phone, "0"),
            'msg_body' => "Your pin is " . $this->otp,
            'unique_id' => $this->trans_id . 'SM',
            'trans_type' => 'SMS',
            'sender_id' => "MEDIABILO-TICKETS",
            'service_id' => 571,
            'msg_type' => "T",
        );
        self::sendSMS($smsdata);
        //return $_SESSION['session_otp'];
    }

    public static function verifyOtp($otp)
    {
        try {
            $transaction = DB::queryFirstRow('SELECT * ,SUM(price) as total_price FROM ticket_transactions WHERE otp=%s_otp', [
                'otp' => $otp,
            ]);
            if(empty($transaction)){
                UserResponse::displayMessage(404,'The otp entered does not exist');
            } else{
                $otp_sent_duration = self::getTimeAgo(strtotime($transaction['trans_date']));
                if($transaction['otp_status'] != 'pending'){
                    UserResponse::displayMessage(401, 'This token has expired');
                }
                if ($otp_sent_duration <= 5) {
                    //proceed to make transaction request
                    $data = array(
                        'phone' => $transaction['phonenumber'],
                        'amount' => $transaction['total_price'],
                        'trans_id' => $transaction['trans_id'],
                        'network' => $transaction['ntwk_type'],
                       // 'voucher' => $transaction['voucher_code'],
                    );
                    self::updateOtpStatus($otp,'verified');
                   // PaymentRequest::executeRequest(json_encode($data));

                    UserResponse::displayMessage(200, 'Phone verification succesful');
                } else {
                    self::updateOtpStatus($otp,'expired');
                    UserResponse::displayMessage(404, 'Your token has expired');
                } 
            } 
          
        } catch (\Throwable $th) {
            UserResponse::displayMessage(500, $th->getMessage());
        }

    }

    private static function getTimeAgo($time)
    {
        $timediff = time() - $time;
        $days = intval($timediff / 86400);
        $remain = $timediff % 86400;
        $hours = intval($remain / 3600);
        $remain = $remain % 3600;
        $mins = intval($remain / 60);
        $secs = $remain % 60;
        return $mins;
    }
    
    private static function updateOtpStatus($otp,$status){

        try {
            DB::update('ticket_transactions',
        [
            'otp_status'=>$status
        ], "otp=%s",$otp);
        //UserResponse::displayMessage(200,'Update applied succesfully');
        } catch (\Throwable $th) {
            //throw $th;
            UserResponse::displayMessage(500,$th->getMessage());
        }

    }
}
