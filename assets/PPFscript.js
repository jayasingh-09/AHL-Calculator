document.addEventListener("DOMContentLoaded", () => {
  // Set initial default values
  document.getElementById("deposit").value = 10000;
  document.getElementById("tenure").value = 15;
  document.getElementById("depositRange").value = 10000;
  document.getElementById("tenureRange").value = 15;

  // Perform the initial calculation
  calculateResults();

  // Event listeners for input changes
  document.getElementById("deposit").addEventListener("input", (e) => {
    syncRange("depositRange", e.target.value);
  });
  document.getElementById("depositRange").addEventListener("input", (e) => {
    syncInput("deposit", e.target.value);
  });

  document.getElementById("tenure").addEventListener("input", (e) => {
    syncRange("tenureRange", e.target.value);
  });
  document.getElementById("tenureRange").addEventListener("input", (e) => {
    syncInput("tenure", e.target.value);
  });

  // Handle Range Bar UI Updates for all range inputs
  document
    .querySelectorAll(".input-field input[type='range']")
    .forEach((input) => {
      input.addEventListener("input", function () {
        let min = this.min;
        let max = this.max;
        let val = this.value;
        let percentage = ((val - min) / (max - min)) * 100;

        // Apply dynamic progress color
        this.style.setProperty("--progress", percentage + "%");
      });

      // Initialize on page load
      input.dispatchEvent(new Event("input"));
    });

  // Handle FAQ toggle behavior
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
});

// Function to sync range slider with number input
function syncInput(inputId, value) {
  const inputElement = document.getElementById(inputId);
  inputElement.value = value; // Update the linked input
  calculateResults();
}

// Function to sync number input with range slider
function syncRange(rangeId, value) {
  const rangeElement = document.getElementById(rangeId);
  rangeElement.value = value; // Update the linked range
  calculateResults();
}

// Function to calculate results and update UI
function calculateResults() {
  const deposit = parseFloat(document.getElementById("deposit").value) || 10000;
  const interestRate = 7.1 / 100; // Fixed interest rate
  const tenure = parseInt(document.getElementById("tenure").value) || 15;

  // Validation: Check if values meet minimum requirements
  if (deposit < 500 || tenure < 15) {
    document.getElementById("investedAmount").innerText = "₹0";
    document.getElementById("totalInterest").innerText = "₹0";
    document.getElementById("maturityValue").innerText = "₹0";
    return;
  }

  // Maturity Amount Formula
  const maturityAmount = Math.round(
    deposit *
      (((1 + interestRate) ** tenure - 1) / interestRate) *
      (1 + interestRate)
  );

  const totalInterest = Math.round(maturityAmount - deposit * tenure);
  const investedAmount = Math.round(deposit * tenure);

  // ✅ Update UI Elements with calculated values
  document.getElementById(
    "investedAmount"
  ).innerText = `₹${investedAmount.toLocaleString("en-IN")}`;
  document.getElementById(
    "totalInterest"
  ).innerText = `₹${totalInterest.toLocaleString("en-IN")}`;
  document.getElementById(
    "maturityValue"
  ).innerText = `₹${maturityAmount.toLocaleString("en-IN")}`;
}
