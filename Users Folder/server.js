const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy in-memory "users"
const users = [];

// Register route
app.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ name, email, phone, password }); // In real app, hash password!
  return res.status(201).json({ message: "User registered successfully" });
});

// Login route
app.post('/login', (req, res) => {
  const { id, password } = req.body;
  const user = users.find(u => (u.email === id || u.phone === id) && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({ message: "Login successful", user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
