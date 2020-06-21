<?php
function sendMail($i,$id){
     $time = date('Y-m-d H:i:s');
$to_email = "lawrencearkoh6@gmail.com";
   $subject = "$id to $to_email at $time...";
   $body = "Email successfully sent to $to_email at $time...";
   $headers = "From: sender$i@example.com";
   
   if ( mail($to_email, $subject, $body, $headers)) {
      echo("Email successfully sent to $to_email at $time...");
   } else {
      echo("Email sending failed...");
   }
}
sendMail("laww","some id");
   ?>