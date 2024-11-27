document.getElementById("basicSalary").value = 1000;
document.getElementById("HRA").value = 1000;
document.getElementById("rentPaid").value = 1000;
document.getElementById("DA").value = 0;
document.querySelector('input[name="metro"][value="yes"]').checked = true;
function calculateHRA() {
  const basicSalary =
    parseFloat(document.getElementById("basicSalary").value) || 1000;
  const DA = parseFloat(document.getElementById("DA").value) || 0; // Default to 0 if DA is not entered
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

  const salaryWithDA = basicSalary + DA; // Basic Salary + DA
  const exemptedHRA = rentPaid - 0.1 * salaryWithDA;
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

// Trigger initial calculation
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