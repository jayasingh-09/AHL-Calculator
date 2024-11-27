document.addEventListener("DOMContentLoaded", () => {
  // Initialize default values
  document.getElementById("deposit").value = 500;
  document.getElementById("interestRate").value = 7.1;
  document.getElementById("tenure").value = 15;

  // Initialize results with zero
  document.getElementById("result").innerHTML = `
    <div class="result-item">
      <span>Invested amount: </span>
      <span>₹0</span>
    </div>
    <div class="result-item">
      <span>Total interest: </span>
      <span>₹0</span>
    </div>
    <div class="result-item">
      <span>Maturity value: </span>
      <span>₹0</span>
    </div>
  `;

  // Function to calculate maturity, interest, and investment
  function calculateResults() {
    const deposit = parseFloat(document.getElementById("deposit").value); // P
    const interestRate =
      parseFloat(document.getElementById("interestRate").value) / 100; // i
    const tenure = parseInt(document.getElementById("tenure").value); // N

    if (
      isNaN(deposit) ||
      isNaN(interestRate) ||
      isNaN(tenure) ||
      deposit <= 0 ||
      tenure < 15
    ) {
      document.getElementById("result").innerHTML = `
        <div class="result-item">
          <span>Invested amount: </span>
          <span>₹0</span>
        </div>
        <div class="result-item">
          <span>Total interest: </span>
          <span>₹0</span>
        </div>
        <div class="result-item">
          <span>Maturity value: </span>
          <span>₹0</span>
        </div>
      `;
      return;
    }

    // Correct formula for annual compounding
    const maturityAmount =
      deposit * ((Math.pow(1 + interestRate, tenure) - 1) / interestRate);
    const totalInterest = maturityAmount - deposit * tenure;
    const investedAmount = deposit * tenure;

    // Display calculated results
    document.getElementById("result").innerHTML = `
      <div class="result-item">
        <span>Invested amount: </span>
        <span>₹${investedAmount.toLocaleString("en-IN")}</span>
        
      </div>
      <br>
      <div class="result-item">
        <span>Total interest: </span>
        <span>₹${totalInterest.toLocaleString("en-IN")}</span>
        
      </div>
      <br>
      <div class="result-item">
        <span>Maturity value: </span>
        <span>₹${maturityAmount.toLocaleString("en-IN")}</span>
      </div>
    `;
  }

  // Trigger calculation dynamically on input changes
  document
    .querySelectorAll("#deposit, #interestRate, #tenure")
    .forEach((input) => {
      input.addEventListener("input", calculateResults);
    });

  // Perform initial calculation
  calculateResults();
});

// FAQ functionality
document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});
