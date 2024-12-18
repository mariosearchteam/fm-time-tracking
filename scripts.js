let jsonData = [];
let activeTimeframe = "weekly";

// Read data from JSON file
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    jsonData = data;
    updateUI(activeTimeframe);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Update UI
function updateUI(timeframe) {
  jsonData.forEach((item) => {
    const card = document.querySelector(`.card--${item.title.toLowerCase()}`);
    const time = card.querySelector(".card__time");
    const sum = card.querySelector(".card__sum");

    time.textContent = `${item.timeframes[timeframe].current}hrs`;
    sum.textContent = `Previous - ${item.timeframes[timeframe].previous}hrs`;
  });
}

// Event listener for nav links
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    document
      .querySelectorAll(".nav a")
      .forEach((a) => a.classList.remove("active"));
    link.classList.add("active");

    activeTimeframe = link.textContent.toLowerCase();
    updateUI(activeTimeframe);
  });
});
