<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $amount = $_POST['amount'];
  $method = $_POST['method'];
  $log = date('Y-m-d H:i:s') . " - Amount: KES $amount, Method: $method\n";
  file_put_contents("donation_log.txt", $log, FILE_APPEND);
}
?>
