let selectedAmount = 50;
let selectedFrequency = "one-time";

document.querySelectorAll(".amount-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedAmount = btn.dataset.amount;
    document.querySelectorAll(".amount-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("customAmount").value = '';
    updateDonateLabel();
  });
});

document.getElementById("customAmount").addEventListener("input", function() {
  selectedAmount = this.value || 0;
  document.querySelectorAll(".amount-btn").forEach(b => b.classList.remove("active"));
  updateDonateLabel();
});

document.querySelectorAll(".frequency-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedFrequency = btn.dataset.type;
    document.querySelectorAll(".frequency-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

function updateDonateLabel() {
  document.getElementById("donateBtn").innerText = `Donate $${selectedAmount}`;
}

document.getElementById("donate-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert(`Thank you for your ${selectedFrequency} donation of $${selectedAmount}!`);
});


const modal = document.getElementById('payment-modal');
const donateBtn = document.getElementById('donate-btn');
const closeBtn = document.querySelector('.close-modal');
const amountInput = document.getElementById('amount');

// Show modal when Donate Now is clicked
donateBtn.addEventListener('click', () => {
  if (amountInput.value.trim() === "" || Number(amountInput.value) <= 0) {
    alert("Please enter a valid donation amount before continuing.");
    return;
  }
  modal.style.display = 'flex';
});

// Close modal
closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// PayPal with amount
document.getElementById('paypal-btn').addEventListener('click', () => {
  const amount = amountInput.value;
  const paypalURL = `https://www.paypal.com/donate?business=mosesmmata70@gmail.com&amount=${amount}&currency_code=USD`;
  window.location.href = paypalURL;
});

// M-Pesa with amount
document.getElementById('mpesa-btn').addEventListener('click', () => {
  const amount = amountInput.value;
  alert(`To donate via M-Pesa:\nSend KES ${amount} to Till Number 123456.\nThank you for your support!`);
});



//next donate on button choose without data entry
