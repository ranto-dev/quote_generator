const quotes = require("../data/quotes");

module.exports.getQuote = (key_word) => {
  let new_quotes = [];

  for (let q of quotes) {
    if (q.citation.indexOf(key_word) > -1 || q.author.indexOf(key_word) > -1) {
      new_quotes.push(q);
    }
  }

  return new_quotes;
};
