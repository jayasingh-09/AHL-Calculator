// Synchronizes the number input with the range slider value
function syncInput(rangeId, inputId) {
  const rangeElement = document.getElementById(rangeId);
  const inputElement = document.getElementById(inputId);
  inputElement.value = rangeElement.value;
  calculateGratuity();
}

// Synchronizes the range slider with the number input value
function syncRange(inputId, rangeId) {
  const inputElement = document.getElementById(inputId);
  const rangeElement = document.getElementById(rangeId);
  rangeElement.value = inputElement.value;
  calculateGratuity();
}

// Set default values for Monthly Salary and Years of Service
document.getElementById("monthlySalary").value = 60000;
document.getElementById("monthlySalaryRange").value = 60000;
document.getElementById("yearsOfservice").value = 20;
document.getElementById("yearsOfserviceRange").value = 20;

// Function to calculate gratuity based on monthly salary and years of service
function calculateGratuity() {
  const monthlySalary = parseFloat(
    document.getElementById("monthlySalary").value || 60000
  );
  const yearsOfservice = parseInt(
    document.getElementById("yearsOfservice").value || 20
  );

  // Check for valid input values
  if (isNaN(monthlySalary) || isNaN(yearsOfservice) || yearsOfservice <= 0) {
    document.getElementById("result").innerText =
      "Please fill out all fields correctly.";
    return;
  }

  // Calculate gratuity amount
  const gratuityAmount = Math.round(
    (monthlySalary * yearsOfservice * 15) / 26
  );

  // Display gratuity amount
  document.getElementById(
    "result"
  ).innerText = `Gratuity Amount: ₹${gratuityAmount.toLocaleString()}`;
}

// Event listener to update gratuity calculation when the user interacts with input fields
document
  .querySelectorAll("#monthlySalary, #yearsOfservice")
  .forEach((input) => {
    input.addEventListener("input", calculateGratuity);
  });
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });

// Initial trigger to calculate gratuity with default values
calculateGratuity();
