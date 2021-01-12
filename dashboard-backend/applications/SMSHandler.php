<?php
class SMSHandler{
    public static function sendSMS($sms_data)
    {
        $service_id = 571;
        $base_url = 'https://orchard-api.anmgw.com';
        $client_key = 'edZf2oxWaijXXVj5ToHScyzB7gU51RDGeMi8LqxwOZ6/sH+G1qhUGoIAX3RwbZqo/47dHdtfzd6/C1+S7MW6KA==';
        $secrete_key = 'hja3WVEdB5bAQWYhhi2dPzTVx3Ppv9ydlJooZQU3sN6/MF56vZTipp7VtMScwfZZXODwGXuz4AEXT+ILIxlV5g==';
        try {

            $body = json_encode($sms_data);
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
            $transactionult = curl_exec($ch);
            //echo $transactionult;
         //   UserResponse::displayMessage(200,'Please wait for sms and verify your phone number');
        } catch (Exception $e) {
            //echo $e->getMessage();
            UserResponse::displayMessage(500,$e->getMessage());
        }
        curl_close($ch);
    }
}