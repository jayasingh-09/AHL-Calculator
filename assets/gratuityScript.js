document.getElementById("result").innerText = "Gratuity Amount: ₹0.00";

document.getElementById("monthlySalary").value = 10000;
document.getElementById("yearsOfservice").value = 5;

function calculateGratuity() {
  const monthlySalary = parseFloat(
    document.getElementById("monthlySalary").value
  );
  const yearsOfservice = parseInt(
    document.getElementById("yearsOfservice").value
  );

  if (isNaN(monthlySalary) || isNaN(yearsOfservice) || yearsOfservice <= 0) {
    document.getElementById("result").innerText =
      "Please fill out all fields correctly.";
    return;
  }

  const gratuityAmount = (monthlySalary * yearsOfservice * 15) / 26;

  document.getElementById(
    "result"
  ).innerText = `Gratuity Amount: ₹${gratuityAmount.toFixed(2)}`;
}

document
  .querySelectorAll("#monthlySalary, #yearsOfservice")
  .forEach((input) => {
    input.addEventListener("input", calculateGratuity);
  });

// Trigger initial calculation with default values
calculateGratuity();

document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});
