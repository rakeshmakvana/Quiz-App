const Language = require("../models/Languages");

exports.getLanguages = async (req, res) => {
    try {
        const language = await Language.find();
        res.status(200).json(language);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLanguageById = async (req, res) => {
    try {
        const language = await Language.find({ _id: req.params.languageId });
        res.status(200).json(language);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addLanguage = async (req, res) => {
    const { name, time } = req.body;
    try {
        const language = new Language({
            name,
            time,
        });
        await language.save();
        res.status(201).json({ message: "Language added successfully", language });
    } catch (error) {
        res.status(500).json({ message: "Error adding language", error });
    }
};