const express = require("express");
const cors = require("cors");
const { getQuote } = require("./function/getQuote");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/api/", (req, res) => {
  res.json({ message: "salut" });
});

app.post("/api/quote", (req, res) => {
  const key_word = req.body.key_word;
  const custome_quotes = getQuote(key_word);
  if (custome_quotes.length <= 0) {
    res
      .status(400)
      .json({ message: "Quote with this key word is not found !" });
  } else {
    res.status(200).json({ message: custome_quotes });
  }
});

app.listen(PORT, () => {
  console.log(`Application is running at port: ${PORT}`);
});
