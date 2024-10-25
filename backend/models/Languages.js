const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;