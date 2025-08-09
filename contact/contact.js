document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      formMessage.textContent = "⚠️ Please fill in all fields.";
      formMessage.style.color = "#9e1b33";
      return;
    }

    formMessage.textContent = "✅ Thank you, your message has been sent!";
    formMessage.style.color = "#1e6959";

    // Simulate reset after send
    form.reset();
    setTimeout(() => {
      formMessage.textContent = "";
    }, 5000);
  });
});

