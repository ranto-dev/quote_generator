// --------- UX Améliorations ---------
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");
  const results = document.getElementById("results");

  btn.addEventListener("click", async () => {
    const keyword = input.value.trim();
    if (!keyword) return;

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword }),
    });

    const data = await res.json();
    results.innerHTML = "";

    if (data.results.length === 0) {
      results.innerHTML = `
        <div class="text-center text-gray-500 animate-pulse">
          Aucune citation trouvée pour ce mot-clé.
        </div>`;
      return;
    }

    data.results.forEach((c, i) => {
      const card = document.createElement("div");
      card.className =
        "bg-white border-l-4 border-blue-600 shadow-md rounded-lg p-4 fade-in";
      card.style.animationDelay = `${i * 0.1}s`;
      card.innerHTML = `
        <p class="text-lg italic text-gray-700">"${c.text}"</p>
        <p class="text-right mt-2 font-semibold text-blue-800">— ${c.author}</p>
      `;
      results.appendChild(card);
    });
  });
});

// 1. Bouton retour en haut
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollBtn.classList.remove("hidden");
  } else {
    scrollBtn.classList.add("hidden");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 2. Afficher / cacher la barre de recherche au scroll
let lastScroll = 0;
const stickySearchBar = document.querySelector(".sticky, .search-bar");
if (stickySearchBar) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll) {
      // vers le bas
      stickySearchBar.style.transform = "translateY(-100%)";
    } else {
      // vers le haut
      stickySearchBar.style.transform = "translateY(0)";
    }
    lastScroll = currentScroll;
  });
}

// 3. Scroll automatique vers le haut au clic
document.getElementById("searchBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
