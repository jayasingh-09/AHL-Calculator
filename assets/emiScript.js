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

  // Set default values for Loan Amount, Interest Rate, and Tenure
  const defaultValues = {
    loan: 100000,
    interestRate: 6.5,
    tenure: 5,
  };

  document.getElementById("loan").value = defaultValues.loan;
  document.getElementById("interestRate").value = defaultValues.interestRate;
  document.getElementById("tenure").value = defaultValues.tenure;

  document.getElementById("loanRange").value = defaultValues.loan;
  document.getElementById("interestRateRange").value =
    defaultValues.interestRate;
  document.getElementById("tenureRange").value = defaultValues.tenure;

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

  // // Sync number inputs with range sliders
  // document
  //   .querySelectorAll("#loan, #interestRate, #tenure")
  //   .forEach((input) => {
  //     input.addEventListener("input", (event) => {
  //       const rangeId = `${event.target.id}Range`;
  //       syncRange(rangeId, event.target.id);
  //       calculateEMI();
  //     });
  //   });

  // // Sync range sliders with number inputs
  // document
  //   .querySelectorAll("#loanRange, #interestRateRange, #tenureRange")
  //   .forEach((range) => {
  //     range.addEventListener("input", (event) => {
  //       const inputId = event.target.id.replace("Range", "");
  //       syncInput(inputId, event.target.id);
  //       calculateEMI();
  //     });
  //   });


  // Sync number inputs with range sliders
  document.querySelectorAll("input[type='number']").forEach((input) => {
    input.addEventListener("input", (event) => {
      const rangeId = `${event.target.id}Range`;
      syncInput(event.target.id, rangeId);
    });
  });

  // Sync range sliders with number inputs
  document.querySelectorAll("input[type='range']").forEach((range) => {
    range.addEventListener("input", (event) => {
      const inputId = event.target.id.replace("Range", "");
      syncInput(event.target.id, inputId);
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
