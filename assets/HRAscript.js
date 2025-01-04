function syncInput(inputId, value) {
  const inputElement = document.getElementById(inputId);
  inputElement.value = value;
  calculateHRA();
}

function syncRange(rangeId, value) {
  const rangeElement = document.getElementById(rangeId);
  rangeElement.value = value;
  calculateHRA();
}
document
  .querySelectorAll(".input-field input[type='range']")
  .forEach((input) => {
    input.addEventListener("input", function () {
      let min = this.min;
      let max = this.max;
      let val = this.value;
      let percentage = ((val - min) / (max - min)) * 100;

      // This applies the progress color dynamically
      this.style.setProperty("--progress", percentage + "%");
    });

    // Initialize on page load
    input.dispatchEvent(new Event("input"));
  });

// Set default values
document.getElementById("basicSalary").value = 5400000;
document.getElementById("basicSalaryRange").value = 5400000;
document.getElementById("HRA").value = 100000;
document.getElementById("HRARange").value = 100000;
document.getElementById("DA").value = 0;
document.getElementById("DARange").value = 0;
document.getElementById("rentPaid").value = 300000;
document.getElementById("rentPaidRange").value = 300000;
document.querySelector('input[name="metro"][value="yes"]').checked = true;

document
  .getElementById("basicSalaryRange")
  .addEventListener("input", function () {
    syncInput("basicSalary", this.value);
  });
document.getElementById("HRARange").addEventListener("input", function () {
  syncInput("HRA", this.value);
});
document.getElementById("DARange").addEventListener("input", function () {
  syncInput("DA", this.value);
});
document.getElementById("rentPaidRange").addEventListener("input", function () {
  syncInput("rentPaid", this.value);
});

function calculateHRA() {
  const basicSalary =
    parseFloat(document.getElementById("basicSalary").value) || 0;
  const DA = parseFloat(document.getElementById("DA").value) || 0;
  const HRA = parseFloat(document.getElementById("HRA").value) || 0;
  const rentPaid = parseFloat(document.getElementById("rentPaid").value) || 0;

  const salaryWithDA = basicSalary + DA; // Basic salary + DA
  const rentExcess = rentPaid - 0.1 * salaryWithDA; // Rent Paid - 10% of Basic Salary + DA
  const metroLimit = 0.5 * salaryWithDA; // 50% for Metro Cities
  const nonMetroLimit = 0.4 * salaryWithDA; // 40% for Non-Metro Cities

  // Determine if metro or non-metro
  const metroRadio = document.querySelector('input[name="metro"]:checked');
  const cityLimit = metroRadio.value === "yes" ? metroLimit : nonMetroLimit;

  // Exempted HRA is the minimum of the three conditions
  const exemptedHRA = Math.min(HRA, rentExcess > 0 ? rentExcess : 0, cityLimit);

  // Taxable HRA
  const taxableHRA = HRA - exemptedHRA;

  // Update the results
  document.getElementById("result").innerText = `Exempted HRA: ₹${Math.max(
    0,
    exemptedHRA
  ).toLocaleString("en-IN")}`;
  document.getElementById(
    "resultTAXABLE"
  ).innerText = `Taxable HRA: ₹${Math.max(0, taxableHRA).toLocaleString(
    "en-IN"
  )}`;
}

// Add event listeners
document
  .querySelectorAll("#basicSalary, #DA, #HRA, #rentPaid, input[name='metro']")
  .forEach((input) => {
    input.addEventListener("input", calculateHRA);
  });

// Initial calculation
calculateHRA();


document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});