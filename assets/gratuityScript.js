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
document.getElementById("monthlySalary").value=10000;
document.getElementById("monthlySalaryRange").value=10000;
document.getElementById("yearsOfservice").value = 5;
document.getElementById("yearsOfserviceRange").value = 5;

// Function to calculate gratuity based on monthly salary and years of service
function calculateGratuity() {
  const monthlySalary = parseFloat(
    document.getElementById("monthlySalary").value || 10000
  );
  const yearsOfservice = parseInt(
    document.getElementById("yearsOfservice").value || 5
  );

  // Check for valid input values
  if (isNaN(monthlySalary) || isNaN(yearsOfservice) || yearsOfservice <= 0) {
    document.getElementById("result").innerText =
      "Please fill out all fields correctly.";
    return;
  }

  // Calculate gratuity amount
  const gratuityAmount = (monthlySalary * yearsOfservice * 15) / 26;

  // Display gratuity amount
  document.getElementById(
    "result"
  ).innerText = `Gratuity Amount: ₹${gratuityAmount.toFixed(2)}`;
}

// Event listener to update gratuity calculation when the user interacts with input fields
document
  .querySelectorAll("#monthlySalary, #yearsOfservice")
  .forEach((input) => {
    input.addEventListener("input", calculateGratuity);
  });

// Initial trigger to calculate gratuity with default values
calculateGratuity();
