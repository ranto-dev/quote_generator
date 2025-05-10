const quotes = document.querySelector(".quotes")

fetch("/api/quotes.json", {
  method: "GET",
})
  .then((res) => res.json())
  .then((res) => {
    for(let q of res) {
        quotes.innerHTML += quote(q.quote, q.author)
    }
  });

function quote(quote, author) {
  return `
    <div class="quote">
        <span class="quote-text">${quote}</span>
        <span class="quote-author">${author}</span>
    </div>
    `;
}
