const express = require("express");
const router = express.Router();
const { addQuestion, getQuestionsByLanguageId } = require("../controllers/questions");

router.post("/add", addQuestion);
router.get("/101/:languageId", getQuestionsByLanguageId);

module.exports = router;