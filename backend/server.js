const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const language = require("./routes/languages");
const question = require("./routes/questions");
const result = require("./routes/results");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/language", language);
app.use("/api/question", question);
app.use("/api/result", result);

app.listen(PORT, () => {
  console.log(`Server Starting On http://localhost:${PORT}`);
  db();
});