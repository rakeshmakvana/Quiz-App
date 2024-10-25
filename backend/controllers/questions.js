const Question = require("../models/Questions");
const mongoose = require("mongoose");

exports.addQuestion = async (req, res) => {
    const { language, question, options, answer } = req.body;
    try {
        const newQuestion = await new Question({
            language: new mongoose.Types.ObjectId(language),
            question: question,
            options: options,
            answer: answer,
        });
        const savedQuestion = await newQuestion.save();
        res.status(201).json({ message: "Question added successfully", question: savedQuestion });
    } catch (error) {
        res.status(500).json({ message: "Error adding question", error: error.message });
    }
};

exports.getQuestionsByLanguageId = async (req, res) => {
    try {
        const question = await Question.find({
            language: new mongoose.Types.ObjectId(req.params.languageId),
        }).populate("language");      
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};