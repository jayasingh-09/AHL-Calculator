document.addEventListener("DOMContentLoaded", function () {
  // Function to sync number input with range slider
  function syncInput(rangeId, inputId) {
    const rangeElement = document.getElementById(rangeId);
    const inputElement = document.getElementById(inputId);
    if (rangeElement && inputElement) {
      inputElement.value = rangeElement.value;
      updateRangeProgress(rangeElement);
      calculateGratuity();
    }
  }

  // Function to sync range slider with number input
  function syncRange(inputId, rangeId) {
    const inputElement = document.getElementById(inputId);
    const rangeElement = document.getElementById(rangeId);
    if (inputElement && rangeElement) {
      rangeElement.value = inputElement.value;
      updateRangeProgress(rangeElement);
      calculateGratuity();
    }
  }

  // Function to update range slider background progress dynamically
  function updateRangeProgress(rangeElement) {
    let min = rangeElement.min;
    let max = rangeElement.max;
    let val = rangeElement.value;
    let percentage = ((val - min) / (max - min)) * 100;
    rangeElement.style.background = `linear-gradient(to right, #0c457c ${percentage}%, #ddd ${percentage}%)`;
  }

  // Function to calculate Gratuity and update UI
  function calculateGratuity() {
    const monthlySalary = parseFloat(
      document.getElementById("monthlySalary").value
    );
    const yearsOfservice = parseInt(
      document.getElementById("yearsOfservice").value
    );

    // Ensure elements exist before updating them
    const gratuityValueElement = document.getElementById("gratuityValue");
    const displayMonthlySalaryElement = document.getElementById(
      "displayMonthlySalary"
    );
    const displayYearsOfServiceElement = document.getElementById(
      "displayYearsOfService"
    );

    if (
      !gratuityValueElement ||
      !displayMonthlySalaryElement ||
      !displayYearsOfServiceElement
    ) {
      console.error("Missing elements in HTML. Check IDs.");
      return;
    }

    // Handle invalid inputs
    if (
      isNaN(monthlySalary) ||
      isNaN(yearsOfservice) ||
      monthlySalary < 10000 ||
      yearsOfservice < 5
    ) {
      gratuityValueElement.innerText = "Please enter valid values.";
      displayMonthlySalaryElement.innerText = "N/A";
      displayYearsOfServiceElement.innerText = "N/A";
      return;
    }

    // Gratuity Calculation Formula
    const gratuityAmount = Math.round(
      (monthlySalary * yearsOfservice * 15) / 26
    );

    // Update UI with Indian Number Format
    gratuityValueElement.innerText = `₹${gratuityAmount.toLocaleString(
      "en-IN"
    )}`;
    displayMonthlySalaryElement.innerText = `₹${monthlySalary.toLocaleString(
      "en-IN"
    )}`;
    displayYearsOfServiceElement.innerText = yearsOfservice;
  }

  // Sync number inputs with range sliders
  document
    .querySelectorAll("#monthlySalary, #yearsOfservice")
    .forEach((input) => {
      input.addEventListener("input", function () {
        const rangeId = `${this.id}Range`;
        syncRange(this.id, rangeId);
      });
    });

  // Sync range sliders with number inputs
  document
    .querySelectorAll("#monthlySalaryRange, #yearsOfserviceRange")
    .forEach((range) => {
      range.addEventListener("input", function () {
        const inputId = this.id.replace("Range", "");
        syncInput(this.id, inputId);
      });
    });

  // Ensure range progress updates correctly
  document
    .querySelectorAll(".input-field input[type='range']")
    .forEach((input) => {
      input.addEventListener("input", function () {
        updateRangeProgress(this);
      });

      // Initialize range progress on page load
      input.dispatchEvent(new Event("input"));
    });

  // Initial Calculation on Page Load
  calculateGratuity();
});
