<?php
$phone = $_POST['phone'];
$amount = $_POST['amount'];

// Convert USD to KES (assume fixed rate, e.g., 1 USD = 140 KES)
$kesAmount = round($amount * 140);

// Daraja credentials (sandbox)
$consumerKey = "YOUR_CONSUMER_KEY";
$consumerSecret = "YOUR_CONSUMER_SECRET";
$shortcode = "174379"; // Test Paybill
$passkey = "YOUR_PASSKEY";
$callbackUrl = "https://yourdomain.com/mpesa_callback.php";

// Get access token
$token_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
$credentials = base64_encode("$consumerKey:$consumerSecret");

$ch = curl_init($token_url);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Basic $credentials"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$accessToken = json_decode($response)->access_token;
curl_close($ch);

// STK push
$timestamp = date("YmdHis");
$password = base64_encode($shortcode . $passkey . $timestamp);
$stk_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

$payload = [
  "BusinessShortCode" => $shortcode,
  "Password" => $password,
  "Timestamp" => $timestamp,
  "TransactionType" => "CustomerPayBillOnline",
  "Amount" => $kesAmount,
  "PartyA" => $phone,
  "PartyB" => $shortcode,
  "PhoneNumber" => $phone,
  "CallBackURL" => $callbackUrl,
  "AccountReference" => "TBC-USD",
  "TransactionDesc" => "USD Donation"
];

$headers = [
  "Authorization: Bearer $accessToken",
  "Content-Type: application/json"
];

$ch = curl_init($stk_url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);

echo json_encode(["message" => "STK Push sent. Check your phone for KES $kesAmount."]);
?>
