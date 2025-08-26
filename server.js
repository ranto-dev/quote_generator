const express = require("express");
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.json());

const citationsPath = path.join(__dirname, "data", "citations.json");

app.post("/api/search", (req, res) => {
  const keyword = req.body.keyword?.toLowerCase() || "";

  fs.readFile(citationsPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });

    const citations = JSON.parse(data);
    const results = citations.filter(
      (c) =>
        c.text.toLowerCase().includes(keyword) ||
        c.author.toLowerCase().includes(keyword)
    );

    res.json({ results });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
});
