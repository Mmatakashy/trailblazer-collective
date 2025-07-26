<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $amount = floatval($_POST['amount']);
  $card = $_POST['card_number'];
  $expiry = $_POST['expiry'];
  $cvv = $_POST['cvv'];

  // Log data or integrate actual payment API here
  file_put_contents("credit_log.txt", date('c') . " - $amount - $card\n", FILE_APPEND);

  echo "<h2>Thank you! You have donated KES {$amount} via Credit Card.</h2>";
  echo '<p><a href="index.html">Return to Home</a></p>';
}
