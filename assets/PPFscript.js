document.addEventListener("DOMContentLoaded", () => {
  // Set initial default values
  document.getElementById("deposit").value = 10000;
  document.getElementById("tenure").value = 15;
  document.getElementById("depositRange").value = 10000;
  document.getElementById("tenureRange").value = 15;

  // Perform the initial calculation
  calculateResults();

  // Event listeners for input changes
  document
    .getElementById("deposit")
    .addEventListener("input", (e) =>
      syncRange("depositRange", e.target.value)
    );
  document
    .getElementById("depositRange")
    .addEventListener("input", (e) => syncInput("deposit", e.target.value));

  document
    .getElementById("tenure")
    .addEventListener("input", (e) => syncRange("tenureRange", e.target.value));
  document
    .getElementById("tenureRange")
    .addEventListener("input", (e) => syncInput("tenure", e.target.value));
});

function syncInput(inputId, value) {
  const inputElement = document.getElementById(inputId);
  inputElement.value = value; // Update the linked input
  calculateResults();
}

function syncRange(rangeId, value) {
  const rangeElement = document.getElementById(rangeId);
  rangeElement.value = value; // Update the linked range
  calculateResults();
}

function calculateResults() {
  const deposit = parseFloat(document.getElementById("deposit").value) || 10000;
  const interestRate = 7.1 / 100;
  const tenure = parseInt(document.getElementById("tenure").value) || 15;

  if (deposit < 500 || tenure < 15) {
    document.getElementById("result").innerHTML = `
      <div class="result-item">
        <span>Invested amount: </span><span>₹0</span>
      </div>
      <div class="result-item">
        <span>Total interest: </span><span>₹0</span>
      </div>
      <div class="result-item">
        <span>Maturity value: </span><span>₹0</span>
      </div>
    `;
    return;
  }

  const maturityAmount = Math.round(
    deposit *
      (((1 + interestRate) ** tenure - 1) / interestRate) *
      (1 + interestRate)
  );

  const totalInterest = Math.round(maturityAmount - deposit * tenure);
  const investedAmount = Math.round(deposit * tenure);

  document.getElementById("result").innerHTML = `
    <p><strong>Invested amount: </strong> ₹${investedAmount.toLocaleString(
      "en-IN"
    )}</p>
    <p><strong>Total interest: </strong> ₹${totalInterest.toLocaleString(
      "en-IN"
    )}</p>
    <p><strong>Maturity value: </strong> ₹${maturityAmount.toLocaleString(
      "en-IN"
    )}</p>
  `;
}

document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});
