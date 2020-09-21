<?php
$to = "kofiarko0@gmail.com";
$subject = "My subject";
$txt = "Hello world!";
$headers = "From: webmaster@example.com" . "\r\n" .
"CC: somebodyelse@example.com";

$mail = mail($to,$subject,$txt,$headers);
if (!$mail) {
  echo "eror".$mail;//->ErrorInfo;;  // Reschedule for later try or panic appropriately!
  print_r(error_get_last()); 
}
?> 