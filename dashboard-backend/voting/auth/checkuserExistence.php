<?php
function checkExistence($username)
{
    global $connection;
    $count = $connection->query("SELECT COUNT(*) FROM users WHERE name = '$username' ")->fetchColumn();
    if ($count == 0) {
        $msg = 'does not exist';
        return true;
    } else {
        $msg = 'client already exist';
        return false;
    }
}
?>