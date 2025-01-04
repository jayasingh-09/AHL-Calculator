document.addEventListener("DOMContentLoaded", function () {
  // Function to sync number input with range slider
  function syncInput(inputId, value) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.value = value;
      calculateCAGR();
    }
  }

  // Function to sync range slider with number input
  function syncRange(rangeId, value) {
    const rangeElement = document.getElementById(rangeId);
    if (rangeElement) {
      rangeElement.value = value;
      calculateCAGR();
    }
  }

  // Set default values for the inputs and ranges
  const defaultValues = {
    beginningValue: 5000,
    endingValue: 25000,
    years: 5,
  };

  document.getElementById("beginningValue").value =
    defaultValues.beginningValue;
  document.getElementById("endingValue").value = defaultValues.endingValue;
  document.getElementById("years").value = defaultValues.years;

  document.getElementById("beginningValueRange").value =
    defaultValues.beginningValue;
  document.getElementById("endingValueRange").value = defaultValues.endingValue;
  document.getElementById("yearsRange").value = defaultValues.years;

  // Function to calculate CAGR and update UI
  function calculateCAGR() {
    const beginningValue =
      parseFloat(document.getElementById("beginningValue").value) || 0;
    const endingValue =
      parseFloat(document.getElementById("endingValue").value) || 0;
    const years = parseFloat(document.getElementById("years").value) || 0;

    // Ensure elements exist before updating them
    const cagrValueElement = document.getElementById("cagrValue");
    const cagrProgressElement = document.getElementById("cagrProgress");
    const displayBeginningValueElement = document.getElementById(
      "displayBeginningValue"
    );
    const displayEndingValueElement =
      document.getElementById("displayEndingValue");

    if (
      !cagrValueElement ||
      !cagrProgressElement ||
      !displayBeginningValueElement ||
      !displayEndingValueElement
    ) {
      console.error("Missing elements in HTML. Check IDs.");
      return;
    }

    // Handle invalid inputs
    if (beginningValue <= 0 || endingValue <= 0 || years <= 0) {
      cagrValueElement.textContent = "0%";
      cagrProgressElement.style.width = "1%";
      displayBeginningValueElement.textContent = "N/A";
      displayEndingValueElement.textContent = "N/A";
      return;
    }

    // CAGR Calculation Formula
    const cagr = (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
    const roundedCAGR = Math.round(cagr);

    // Ensure CAGR Scale is Between 1-100 for the Progress Bar
    let cagrScale = Math.min(Math.max(roundedCAGR, 1), 100);

    // Update UI Elements
    cagrValueElement.textContent = `${roundedCAGR}%`;
    cagrProgressElement.style.width = `${cagrScale}%`;

    // Update Beginning & Ending Value Display
    displayBeginningValueElement.textContent =
      beginningValue.toLocaleString("en-IN");
    displayEndingValueElement.textContent = endingValue.toLocaleString("en-IN");
  }

  // Sync number inputs with range sliders
  document
    .querySelectorAll("#beginningValue, #endingValue, #years")
    .forEach((input) => {
      input.addEventListener("input", (event) => {
        const rangeId = `${event.target.id}Range`;
        syncRange(rangeId, event.target.value);
        calculateCAGR();
      });
    });

  // Sync range sliders with number inputs
  document
    .querySelectorAll("#beginningValueRange, #endingValueRange, #yearsRange")
    .forEach((range) => {
      range.addEventListener("input", (event) => {
        const inputId = event.target.id.replace("Range", "");
        syncInput(inputId, event.target.value);
        calculateCAGR();
      });
    });

  // Handle Range Bar UI Updates for all range inputs
  document
    .querySelectorAll(".input-field input[type='range']")
    .forEach((input) => {
      input.addEventListener("input", function () {
        let min = this.min;
        let max = this.max;
        let val = this.value;
        let percentage = ((val - min) / (max - min)) * 100;
        this.style.setProperty("--progress", percentage + "%");
      });
      input.dispatchEvent(new Event("input")); // Initialize on page load
    });

  // Initial Calculation on Page Load
  calculateCAGR();
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
