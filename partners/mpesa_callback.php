<?php
$callback = file_get_contents("php://input");
file_put_contents("mpesa_callback_log.json", $callback . PHP_EOL, FILE_APPEND);
?>
