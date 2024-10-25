const express = require("express");
const router = express.Router();
const { addResult, getUserResults, deleteResult } = require("../controllers/results");

router.post("/100", addResult);
router.get("/101/:user", getUserResults);
router.delete("/102/:languageId/:attemptNo", deleteResult);

module.exports = router;