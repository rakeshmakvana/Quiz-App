const express = require("express");
const router = express.Router();
const { getLanguages, getLanguageById, addLanguage } = require("../controllers/languages");

router.get("/100", getLanguages);
router.get("/101/:languageId", getLanguageById);
router.post("/add", addLanguage);

module.exports = router;