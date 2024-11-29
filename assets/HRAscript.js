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

document.getElementById("basicSalary").value = 1000;
document.getElementById("HRA").value = 1000;
document.getElementById("rentPaid").value = 1000;
document.getElementById("DA").value = 0;
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
    parseFloat(document.getElementById("basicSalary").value) || 1000;
  const DA = parseFloat(document.getElementById("DA").value) || 0;
  const HRA = parseFloat(document.getElementById("HRA").value) || 1000;
  const rentPaid =
    parseFloat(document.getElementById("rentPaid").value) || 1000;

  if (
    isNaN(basicSalary) ||
    isNaN(DA) ||
    isNaN(HRA) ||
    isNaN(rentPaid) ||
    rentPaid <= 0
  ) {
    document.getElementById("result").innerText =
      "Please fill out all fields correctly.";
    document.getElementById("resultTAXABLE").innerText = "";
    return;
  }

  const salaryWithDA = basicSalary + DA;
  const exemptedHRA = Math.max(rentPaid - 0.1 * salaryWithDA, HRA); // Ensure non-negative exempted HRA
  const metroExemptedHRA = 0.5 * salaryWithDA;
  const nonMetroExemptedHRA = 0.4 * salaryWithDA;

  const metroRadio = document.querySelector('input[name="metro"]:checked');

  if (metroRadio) {
    if (metroRadio.value === "yes") {
      const metroHRAExempted = Math.min(exemptedHRA, HRA, metroExemptedHRA);
      const metroTaxableHRA = HRA - metroHRAExempted;

      document.getElementById(
        "result"
      ).innerText = `Exempted HRA: ₹${metroHRAExempted.toFixed(2)}`;
      document.getElementById(
        "resultTAXABLE"
      ).innerText = `Taxable HRA: ₹${metroTaxableHRA.toFixed(2)}`;
    } else if (metroRadio.value === "no") {
      const nonMetroHRAExempted = Math.min(
        exemptedHRA,
        HRA,
        nonMetroExemptedHRA
      );
      const nonMetroTaxableHRA = HRA - nonMetroHRAExempted;

      document.getElementById(
        "result"
      ).innerText = `Exempted HRA: ₹${nonMetroHRAExempted.toFixed(2)}`;
      document.getElementById(
        "resultTAXABLE"
      ).innerText = `Taxable HRA: ₹${nonMetroTaxableHRA.toFixed(2)}`;
    }
  } else {
    document.getElementById("result").innerText =
      "Please select if you live in a metro or non-metro city.";
    document.getElementById("resultTAXABLE").innerText = "";
  }
}

document
  .querySelectorAll("#basicSalary, #DA, #HRA, #rentPaid, input[name='metro']")
  .forEach((input) => {
    input.addEventListener("input", calculateHRA);
  });

calculateHRA();
