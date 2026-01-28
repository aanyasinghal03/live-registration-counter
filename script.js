const API_URL = "https://script.google.com/macros/s/AKfycbxrmNpnP0JGHW_Ts-hstJxQBVNQ-jILXJwE5yhSUfAPT_z1ulex02dLiwclCDHHf-O9WA/exec";

let currentValue = 0;

function animateCounter(target) {
  const start = currentValue;
  const duration = 600;
  const startTime = performance.now();

  function update(time) {
    const progress = Math.min((time - startTime) / duration, 1);
    const value = Math.floor(start + (target - start) * progress);

    const counter = document.getElementById("count");
    counter.textContent = value;

    // punch animation on update
    counter.style.transform = "scale(1.08)";
    setTimeout(() => counter.style.transform = "scale(1)", 120);

    currentValue = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

async function fetchCount() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (data.count !== currentValue) {
      animateCounter(data.count);
    }

    document.getElementById("updated").textContent =
      "Last sync: " + new Date().toLocaleTimeString();

  } catch (err) {
    console.error("API error", err);
    document.getElementById("updated").textContent = "Connection error";
  }
}

fetchCount();
setInterval(fetchCount, 10000);


fetchCount();
setInterval(fetchCount, 10000);


