<?php
function displayResponse($code,$msg)
{

   $resp = array(
       'message'=>$msg, 'resp_code'=>$code
   );
   http_response_code($code);
   echo json_encode($resp);
   die();
}
?>