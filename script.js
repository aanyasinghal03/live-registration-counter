const API_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL";

async function fetchCount() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    document.getElementById("count").textContent = data.count;
    document.getElementById("updated").textContent =
      "Last updated: " + new Date().toLocaleTimeString();
  } catch (err) {
    console.error("Error fetching data", err);
  }
}

fetchCount();
setInterval(fetchCount, 10000);
