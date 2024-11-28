function syncInput(inputId, value) {
  const inputElement = document.getElementById(inputId);
  inputElement.value = value;
  calculateCAGR();
}

function syncRange(rangeId, value) {
  const rangeElement = document.getElementById(rangeId);
  rangeElement.value = value;
  calculateCAGR();
}

document.getElementById("beginningValue").value = 1000;
document.getElementById("endingValue").value = 1000;
document.getElementById("years").value = 1;

document.getElementById("beginningValueRange").value = 1000;
document.getElementById("endingValueRange").value = 1000;
document.getElementById("yearsRange").value = 1;

function calculateCAGR() {
  const beginningValue =
    parseFloat(document.getElementById("beginningValue").value) || 0;
  const endingValue =
    parseFloat(document.getElementById("endingValue").value) || 0;
  const years = parseFloat(document.getElementById("years").value) || 0;

  if (beginningValue <= 0 || endingValue <= 0 || years <= 0) {
    document.getElementById("result").innerHTML = "CAGR: 0.00%";
    return;
  }

  const cagr = (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
  document.getElementById("result").innerHTML = `CAGR: ${cagr.toFixed(2)}%`;
}

document
  .querySelectorAll("#beginningValue, #endingValue, #years")
  .forEach((input) => {
    input.addEventListener("input", (event) => {
      const rangeId = `${event.target.id}Range`;
      syncRange(rangeId, event.target.value);
      calculateCAGR();
    });
  });

document
  .querySelectorAll("#beginningValueRange, #endingValueRange, #yearsRange")
  .forEach((range) => {
    range.addEventListener("input", (event) => {
      const inputId = event.target.id.replace("Range", "");
      syncInput(inputId, event.target.value);
      calculateCAGR();
    });
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

calculateCAGR();
