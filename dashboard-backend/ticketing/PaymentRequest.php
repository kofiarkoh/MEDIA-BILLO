<?php
class PaymentRequest
{
    public static function executeRequest($data)
    {
        $service_id = 571;
        $payload = json_decode($data);

        $paymentdata = array(
            'customer_number' => $payload->phone,
            'amount' => $payload->amount,
            'exttrid' => $payload->trans_id,
            'reference' => 'mediabillo',
            'nw' => $payload->network,
            'trans_type' => 'CTM',
            'callback_url' => 'https://admin.mediabillo.net/appbackend/VoteRecording/voteApiHook.php',
            'service_id' => $service_id,
            'ts' => date('Y-m-d H:i:s'),
            'voucher_code' => $payload->voucher,
        );
        self::submitToEndPoint($paymentdata);
    }

    private static function submitToEndPoint($payment_data)
    {
        $service_id = 571;
        $base_url = 'https://orchard-api.anmgw.com';
        $client_key = 'edZf2oxWaijXXVj5ToHScyzB7gU51RDGeMi8LqxwOZ6/sH+G1qhUGoIAX3RwbZqo/47dHdtfzd6/C1+S7MW6KA==';
        $secrete_key = 'hja3WVEdB5bAQWYhhi2dPzTVx3Ppv9ydlJooZQU3sN6/MF56vZTipp7VtMScwfZZXODwGXuz4AEXT+ILIxlV5g==';

        try {
            //code...
            $body = json_encode($payment_data);

            $signature = hash_hmac('sha256', $body, $secrete_key);
            $auth = 'Authorization: ' . $client_key . ':' . $signature;

            $ch = curl_init($base_url . '/sendRequest');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $body);

            // Set HTTP Header for POST request
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                //  'Content-Type: application/json',
                'Authorization: ' . $client_key . ':' . $signature,
                //  'Content-Length: ' . strlen($payload))
            ));
           $result = json_decode(curl_exec($ch));
            //  echo $result->resp_code;
           /*  if ($result->resp_code == '021') {
                http_response_code(500);
                echo json_encode(array("message" => "Duplicate transaction, please try again"));
                die();
                UserResponse::displayMessage(200,'Payment has been triggered');
            } 
            UserResponse::displayMessage(200,'Payment has been triggered'); */

        } catch (Exception $e) {
            //throw $th;
           /*  echo $e->getMessage();
            die(); */
           // UserResponse::displayMessage(500,$e->getMessage());

        }
        curl_close($ch);

    }
}
