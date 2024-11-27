document.getElementById("loan").value = 100000;
document.getElementById("interestRate").value = 1;
document.getElementById("tenure").value = 1;

// Function to calculate EMI dynamically
function calculateEMI() {
  let loanAmount = parseFloat(document.getElementById("loan").value);
  let annualInterestRate = parseFloat(
    document.getElementById("interestRate").value
  );
  let tenure = parseInt(document.getElementById("tenure").value);

  // Apply default values if fields are empty
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

  document.getElementById("result").innerHTML = `
    <p><strong>Monthly EMI:</strong> ₹${emi.toFixed(2)}</p>
    <p><strong>Principal amount:</strong> ₹${loanAmount.toLocaleString()}</p>
    <p><strong>Total interest:</strong> ₹${totalInterest.toLocaleString()}</p>
    <p><strong>Total amount:</strong> ₹${totalPayment.toLocaleString()}</p>
  `;
}

// Attach event listeners to input fields to trigger calculation dynamically
document.querySelectorAll("#loan, #interestRate, #tenure").forEach((input) => {
  input.addEventListener("input", calculateEMI);
});

// Trigger calculation on page load to show initial values
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
