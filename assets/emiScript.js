function syncInput(sourceId, targetId) {
  const sourceElement = document.getElementById(sourceId);
  const targetElement = document.getElementById(targetId);
  targetElement.value = sourceElement.value;
  calculateEMI();
}

function syncRange(rangeId, value) {
  const rangeElement = document.getElementById(rangeId);
  rangeElement.value = value;
  calculateEMI();
}

// Set default values for Loan Amount, Interest Rate, and Tenure
document.getElementById("loan").value = 100000;
document.getElementById("interestRate").value = 6.5;
document.getElementById("tenure").value = 5;

document.getElementById("loanRange").value = 100000;
document.getElementById("interestRateRange").value = 6.5;
document.getElementById("tenureRange").value = 5;

function calculateEMI() {
  let loanAmount = parseFloat(document.getElementById("loan").value) || 100000;
  let annualInterestRate =
    parseFloat(document.getElementById("interestRate").value) || 6.5;
  let tenure = parseInt(document.getElementById("tenure").value) || 5;

  // Validate input values
  if (isNaN(loanAmount) || loanAmount < 1000 || loanAmount === 0) {
    document.getElementById("result").innerHTML =
      "<p><strong>Loan amount must be at least ₹1000</strong></p>";
    return;
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalMonths = tenure * 12;

  // Perform calculations with full precision
  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Round the final results to the nearest integer
  const roundedEMI = Math.round(emi);
  const roundedTotalPayment = Math.round(totalPayment);
  const roundedTotalInterest = Math.round(totalInterest);

  // Check for valid results
  if (emi > 0 && totalInterest > 0) {
    document.getElementById("result").innerHTML = `
      <p><strong>Monthly EMI:</strong> ₹${roundedEMI.toLocaleString()}</p>
      <p><strong>Principal amount:</strong> ₹${loanAmount.toLocaleString()}</p>
      <p><strong>Total interest:</strong> ₹${roundedTotalInterest.toLocaleString()}</p>
      <p><strong>Total amount:</strong> ₹${roundedTotalPayment.toLocaleString()}</p>
    `;
  } else {
    document.getElementById("result").innerHTML =
      "<p><strong>Enter correct input</strong></p>";
  }
}

document.querySelectorAll("#loan, #interestRate, #tenure").forEach((input) => {
  input.addEventListener("input", calculateEMI);
});

calculateEMI();

document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});
