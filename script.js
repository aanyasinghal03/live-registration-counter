const API_URL = "https://script.google.com/macros/s/AKfycbxrmNpnP0JGHW_Ts-hstJxQBVNQ-jILXJwE5yhSUfAPT_z1ulex02dLiwclCDHHf-O9WA/exec";
const MAX_CAPACITY = 500;

let currentDisplayed = 0;

function animateCount(target) {
  const duration = 500;
  const start = currentDisplayed;
  const startTime = performance.now();

  function update(time) {
    const progress = Math.min((time - startTime) / duration, 1);
    const value = Math.floor(start + (target - start) * progress);
    document.getElementById("count").textContent = value;
    currentDisplayed = value;

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

    const count = data.count;
    animateCount(count);

    document.getElementById("current").textContent = count;
    document.getElementById("max").textContent = MAX_CAPACITY;

    const percent = Math.min((count / MAX_CAPACITY) * 100, 100);
    document.getElementById("progressFill").style.width = percent + "%";

    document.getElementById("updated").textContent =
      "Last updated: " + new Date().toLocaleTimeString();

  } catch (err) {
    console.error("Failed to fetch count", err);
  }
}

fetchCount();
setInterval(fetchCount, 10000);
