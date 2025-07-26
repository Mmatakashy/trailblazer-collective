function switchTab(tab) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(t => t.classList.remove('active'));

  if (tab === 'login') {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    tabs[0].classList.add('active');
  } else {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    tabs[1].classList.add('active');
  }
}

// Simulated backend URL
const BACKEND_URL = "http://localhost:3000";


// Handle Login
function handleLogin(event) {
  event.preventDefault();
  const id = document.getElementById('login-id').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!id || !password) {
    alert("Please fill in all login fields.");
    return;
  }

  // Simulated fetch call
  fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, password })
  })
    .then(res => res.json())
    .then(data => {
      alert("Login successful!");
      console.log(data);
    })
    .catch(err => alert("Login failed."));
}

// Handle Register
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;

  if (!name || !email || !phone || !password || !confirm) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match.");
    return;
  }

  // Simulated fetch call
  fetch(`${BACKEND_URL}/register`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, password })
  })
    .then(res => res.json())
    .then(data => {
      alert("Registration successful!");
      console.log(data);
    })
    .catch(err => alert("Registration failed."));
}
