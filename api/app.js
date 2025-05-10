const express = require("express");

const app = express();
const PORT = 8080;

app.get("/api/quote", (req, res) => {
  res
    .status(200)
    .json({ message: "Ressource is found !", content: "This is the content" });
});

app.listen(PORT, () => {
  console.log(`Application is running at port: ${PORT}`);
});
