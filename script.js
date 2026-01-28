const API_URL = "https://script.google.com/macros/s/AKfycbxrmNpnP0JGHW_Ts-hstJxQBVNQ-jILXJwE5yhSUfAPT_z1ulex02dLiwclCDHHf-O9WA/exec";

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

