document.addEventListener("DOMContentLoaded", function () {
  // Function to sync number input and range slider
  function syncInput(sourceId, targetId) {
    const sourceElement = document.getElementById(sourceId);
    const targetElement = document.getElementById(targetId);
    if (sourceElement && targetElement) {
      targetElement.value = sourceElement.value;
      calculateEMI();
    }
  }

  // Function to sync range slider with number input
  function syncRange(rangeId, inputId) {
    const rangeElement = document.getElementById(rangeId);
    const inputElement = document.getElementById(inputId);
    if (rangeElement && inputElement) {
      rangeElement.value = inputElement.value;
      calculateEMI();
    }
  }

  // Default values based on loan type
  const loanTypes = {
    home: { loan: 100000, interestRate: 6.5, tenure: 5 },
    car: { loan: 400000, interestRate: 8.5, tenure: 5 },
    personal: { loan: 750000, interestRate: 11, tenure: 3 },
  };

  // Ensure a default selected loan type exists
  let selectedLoanTypeElement = document.querySelector(
    "input[name='loan-type']:checked"
  );
  let selectedLoanType = selectedLoanTypeElement
    ? selectedLoanTypeElement.value
    : "home"; // Default to 'home' if no selection
  setLoanValues(selectedLoanType);

  // Function to set values based on selected loan type
  function setLoanValues(type) {
    if (!loanTypes[type]) return;

    const values = loanTypes[type];

    document.getElementById("loan").value = values.loan;
    document.getElementById("interestRate").value = values.interestRate;
    document.getElementById("tenure").value = values.tenure;

    document.getElementById("loanRange").value = values.loan;
    document.getElementById("interestRateRange").value = values.interestRate;
    document.getElementById("tenureRange").value = values.tenure;

    updateRangeProgress(); // Ensure range progress bars are updated

    calculateEMI();
  }

  // Event listeners for radio buttons to update values
  document.querySelectorAll("input[name='loan-type']").forEach((radio) => {
    radio.addEventListener("change", function () {
      setLoanValues(this.value);
    });
  });

  // Function to calculate EMI and update UI
  function calculateEMI() {
    let loanAmount =
      parseFloat(document.getElementById("loan").value) || 100000;
    let annualInterestRate =
      parseFloat(document.getElementById("interestRate").value) || 6.5;
    let tenure = parseInt(document.getElementById("tenure").value) || 5;

    // Validate input values
    if (isNaN(loanAmount) || loanAmount < 1000) {
      document.getElementById("emiValue").innerText = "Enter correct input";
      document.getElementById("displayPrincipalAmount").innerText = "N/A";
      document.getElementById("displayTotalInterest").innerText = "N/A";
      document.getElementById("displayTotalAmount").innerText = "N/A";
      return;
    }

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalMonths = tenure * 12;

    // EMI Formula
    const emi =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    // Round the final results
    const roundedEMI = Math.round(emi);
    const roundedTotalPayment = Math.round(totalPayment);
    const roundedTotalInterest = Math.round(totalInterest);

    // Update UI Elements
    document.getElementById(
      "emiValue"
    ).innerText = `₹${roundedEMI.toLocaleString("en-IN")}`;
    document.getElementById(
      "displayPrincipalAmount"
    ).innerText = `₹${loanAmount.toLocaleString("en-IN")}`;
    document.getElementById(
      "displayTotalInterest"
    ).innerText = `₹${roundedTotalInterest.toLocaleString("en-IN")}`;
    document.getElementById(
      "displayTotalAmount"
    ).innerText = `₹${roundedTotalPayment.toLocaleString("en-IN")}`;
  }

  // Sync number inputs with range sliders
  document.querySelectorAll("input[type='number']").forEach((input) => {
    input.addEventListener("input", (event) => {
      const rangeId = `${event.target.id}Range`;
      syncInput(event.target.id, rangeId);
      updateRangeProgress()
    });
  });

  // Sync range sliders with number inputs
  document.querySelectorAll("input[type='range']").forEach((range) => {
    range.addEventListener("input", (event) => {
      const inputId = event.target.id.replace("Range", "");
      syncInput(event.target.id, inputId);
      updateRangeProgress()
    });
  });

  // Function to update range progress bars
  function updateRangeProgress() {
    document
      .querySelectorAll(".input-field input[type='range']")
      .forEach((input) => {
        let min = input.min;
        let max = input.max;
        let val = input.value;
        let percentage = ((val - min) / (max - min)) * 100;
        input.style.setProperty("--progress", percentage + "%");
      });
  }

  // Handle Range Bar UI Updates for all range inputs
  document
    .querySelectorAll(".input-field input[type='range']")
    .forEach((input) => {
      input.addEventListener("input", function () {
        updateRangeProgress();
      });
      input.dispatchEvent(new Event("input")); // Initialize on page load
    });

  // Initial Calculation on Page Load
  calculateEMI();

  // Handle FAQ toggle behavior
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
});
