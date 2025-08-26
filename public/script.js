document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");
  const results = document.getElementById("results");
  const spinner = document.getElementById("loadingSpinner");

  let allResults = [];
  let currentIndex = 0;
  const PAGE_SIZE = 6;

  btn.addEventListener("click", async () => {
    const keyword = input.value.trim();
    if (!keyword) return;

    results.innerHTML = "";
    currentIndex = 0;
    showSpinner();

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });

      const data = await res.json();
      allResults = data.results;

      if (allResults.length === 0) {
        results.innerHTML = `<div class="text-center text-gray-500">Aucune citation trouvée.</div>`;
      } else {
        displayNextResults();
      }
    } catch (err) {
      results.innerHTML = `<div class="text-center text-red-500">Erreur lors de la recherche.</div>`;
    } finally {
      hideSpinner();
    }
  });

  function showSpinner() {
    spinner.classList.remove("hidden");
  }

  function hideSpinner() {
    spinner.classList.add("hidden");
  }

  function displayNextResults() {
    const slice = allResults.slice(currentIndex, currentIndex + PAGE_SIZE);

    slice.forEach((c, i) => {
      const card = document.createElement("div");
      card.className =
        "bg-white border-l-4 border-blue-600 shadow-md rounded-lg p-4 fade-in";
      card.style.animationDelay = `${i * 0.05}s`;
      card.innerHTML = `
        <p class="text-lg italic text-gray-700">"${c.text}"</p>
        <p class="text-right mt-2 font-semibold text-blue-800">— ${c.author}</p>
      `;
      results.appendChild(card);
    });

    currentIndex += PAGE_SIZE;

    if (currentIndex < allResults.length) {
      const moreBtn = document.createElement("button");
      moreBtn.innerText = "Voir plus";
      moreBtn.className =
        "block mx-auto mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";
      moreBtn.onclick = () => {
        moreBtn.remove();
        displayNextResults();
      };
      results.appendChild(moreBtn);
    }
  }
});
