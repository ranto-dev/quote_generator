const quotes = document.querySelector(".quotes");
const search_form = document.querySelector("#form");
const key_word = document.querySelector("#key_word");

search_form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:8080/api/quote", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ key_word: key_word.value }),
  })
    .then((res) => res.json())
    .then((res) => {
      for (let q of res.message) {
        quotes.innerHTML += quote(q.citation, q.author);
      }
    })
    .catch((err) => console.log(err));
  key_word.value = "";
});

function quote(quote, author) {
  return `
    <div class="quote">
        <span class="quote-text">${quote}</span>
        <span class="quote-author">${author}</span>
    </div>
    `;
}
