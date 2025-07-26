<?php
// Database configuration
$servername = "localhost";
$username = "your_db_username";
$password = "your_db_password";
$dbname = "trailblazers_collective";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Retrieve and sanitize form data
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$amount = floatval($_POST['amount']);
$message = htmlspecialchars($_POST['message']);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO donations (name, email, amount, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssds", $name, $email, $amount, $message);

// Execute statement
if ($stmt->execute()) {
  echo "<h2>Thank you for your donation, $name!</h2>";
} else {
  echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
