function syncInput(sourceId, targetId) {
  const sourceElement = document.getElementById(sourceId);
  const targetElement = document.getElementById(targetId);
  targetElement.value = sourceElement.value;
  calculateEMI();
}

document.getElementById("loan").value = 1000;
document.getElementById("interestRate").value = 1;
document.getElementById("tenure").value = 1;
document.getElementById("loanRange").value = 1000;
document.getElementById("interestRateRange").value = 1;
document.getElementById("tenureRange").value = 1;

function calculateEMI() {
  let loanAmount = parseFloat(document.getElementById("loan").value) || 1000;
  let annualInterestRate =
    parseFloat(document.getElementById("interestRate").value) || 1;
  let tenure = parseInt(document.getElementById("tenure").value) || 1;

  // Validate input values
  if (isNaN(loanAmount) || loanAmount < 1000) {
    document.getElementById("result").innerHTML =
      "<p><strong>Loan amount must be at least ₹1000</strong></p>";
    return;
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalMonths = tenure * 12;

  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Check for valid results
  if (emi > 0 && totalInterest > 0) {
    document.getElementById("result").innerHTML = `
      <p><strong>Monthly EMI:</strong> ₹${emi.toFixed(2)}</p>
      <p><strong>Principal amount:</strong> ₹${loanAmount.toLocaleString()}</p>
      <p><strong>Total interest:</strong> ₹${totalInterest.toLocaleString()}</p>
      <p><strong>Total amount:</strong> ₹${totalPayment.toLocaleString()}</p>
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
