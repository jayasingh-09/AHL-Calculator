function syncInput(sourceId, targetId) {
  const sourceElement = document.getElementById(sourceId);
  const targetElement = document.getElementById(targetId);
  targetElement.value = sourceElement.value;
  calculateEMI();
}

// Set default values for Loan Amount, Interest Rate, and Tenure
document.getElementById("loan").value = 1000000;
document.getElementById("loanRange").value = 1000000;
document.getElementById("interestRate").value = 6.5;
document.getElementById("interestRateRange").value = 6.5;
document.getElementById("tenure").value = 5;
document.getElementById("tenureRange").value = 5;

function calculateEMI() {
  let loanAmount = parseFloat(document.getElementById("loan").value) || 1000000;
  let annualInterestRate =
    parseFloat(document.getElementById("interestRate").value) || 6.5;
  let tenure = parseInt(document.getElementById("tenure").value) || 5;

  if (isNaN(loanAmount) || loanAmount < 100000) loanAmount = 100000;
  if (isNaN(annualInterestRate) || annualInterestRate < 1)
    annualInterestRate = 1;
  if (isNaN(tenure) || tenure < 1) tenure = 1;

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalMonths = tenure * 12;

  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Round all values to integers
  const roundedEMI = Math.round(emi);
  const roundedTotalPayment = Math.round(totalPayment);
  const roundedTotalInterest = Math.round(totalInterest);

  document.getElementById("result").innerHTML = `
    <p><strong>Monthly EMI:</strong> ₹${roundedEMI.toLocaleString()}</p>
    <p><strong>Principal amount:</strong> ₹${loanAmount.toLocaleString()}</p>
    <p><strong>Total interest:</strong> ₹${roundedTotalInterest.toLocaleString()}</p>
    <p><strong>Total amount:</strong> ₹${roundedTotalPayment.toLocaleString()}</p>
  `;
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
