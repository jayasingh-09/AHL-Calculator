document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});
