document.getElementById("result").innerHTML = "CAGR: 0.00%";

document.getElementById("beginningValue").value = 1000;
document.getElementById("endingValue").value = 1000;
document.getElementById("years").value = 1;

function calculateCAGR() {
  const beginningValue = parseFloat(
    document.getElementById("beginningValue").value
  );
  const endingValue = parseFloat(document.getElementById("endingValue").value);
  const years = parseFloat(document.getElementById("years").value);

  if (
    isNaN(beginningValue) ||
    isNaN(endingValue) ||
    isNaN(years) ||
    beginningValue <= 0 ||
    endingValue <= 0 ||
    years <= 0
  ) {
    document.getElementById("result").innerHTML =
      "Please enter valid positive numbers for all fields.";
    return;
  }

  const cagr = (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
  document.getElementById("result").innerHTML = `CAGR: ${cagr.toFixed(2)}%`;
}

document
  .querySelectorAll("#beginningValue, #endingValue, #years")
  .forEach((input) => {
    input.addEventListener("input", calculateCAGR);
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
