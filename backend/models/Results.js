const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  user: {
    type: String,
    default: null,
  },
  language: {
    type: Schema.Types.ObjectId,
    ref: "Language",
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Questions",
    required: true,
  },
  selectedOption: {
    type: String,
    default: null,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  attemptNumber: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;