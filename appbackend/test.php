<?php
header("Content-Type: application/json; charset=UTF-8");

require '../connection.php';
/* $sql = "SELECT * FROM transaction_logs where status ='completed'";
$stmt = $connection->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = 0;
$responsee = array();
foreach ($res as $result) {

    if ($count > 2) {
        break;
    }
  //  $m = executeRequest($result['trans_id']);
    $count++;

}
print_r($responsee); */
//echo $count;
executeRequest('MBILO-1595079025');
function executeRequest($trans_id)
{
    $service_id = 571;

    $paymentdata = array(

        'exttrid' => $trans_id, // 'MBILO-1589991014',
        'trans_type' => 'TSC',
        'service_id' => $service_id,

    );
    $result = submitToEndPoint($paymentdata);
    echo $result;
    return $result;
}

function submitToEndPoint($payment_data)
{
    $service_id = 571;
    $base_url = 'https://orchard-api.anmgw.com';
    $client_key = 'edZf2oxWaijXXVj5ToHScyzB7gU51RDGeMi8LqxwOZ6/s    H+G1qhUGoIAX3RwbZqo/47dHdtfzd6/C1+S7MW6KA==';
    $secrete_key = 'hja3WVEdB5bAQWYhhi2dPzTVx3Ppv9ydlJooZQU3sN6/MF56vZTipp7VtMScwfZZXODwGXuz4AEXT+ILIxlV5g==';

    try {
        //code...
        $body = json_encode($payment_data);

        $signature = hash_hmac('sha256', $body, $secrete_key);
        $auth = 'Authorization: ' . $client_key . ':' . $signature;

        $ch = curl_init($base_url . '/checkTransaction');
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
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;

    } catch (Exception $e) {
        //throw $th;
        curl_close($ch);
        echo $e->getMessage();

    }

}
