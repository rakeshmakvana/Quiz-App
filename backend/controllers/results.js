const Result = require("../models/Results");

exports.addResult = async (req, res) => {
    const data = req.body;
    const user = data.user;
    const result = data.results;
    try {
        if (result) {
            const language = result[0].language;
            const lastAttempt = await Result.findOne({ user, language }).sort({
                attemptNumber: -1,
            });
            let attemptNumber = 1;
            if (lastAttempt) {
                attemptNumber = lastAttempt.attemptNumber + 1;
            }
            result.forEach(async (el) => {
                const userResult = new Result({
                    user: user,
                    language: el.language,
                    question: el.questionId,
                    selectedOption: el.selectedOption,
                    correctAnswer: el.correctAnswer,
                    attemptNumber: attemptNumber,
                });
                await userResult.save();
            });
            res.status(200).json(attemptNumber);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserResults = async (req, res) => {
    const result = await Result.aggregate([
        {
            $match: { user: req.params.user },
        },
        {
            $lookup: {
                from: "languages",
                localField: "language",
                foreignField: "_id",
                as: "languageDetails",
            },
        },
        {
            $unwind: "$languageDetails",
        },
        {
            $group: {
                _id: {
                    language: "$language",
                    attempt: "$attemptNumber",
                },
                totalQuestions: { $sum: 1 },
                correctAnswers: {
                    $sum: {
                        $cond: [{ $eq: ["$selectedOption", "$correctAnswer"] }, 1, 0],
                    },
                },
                wrongAnswers: {
                    $sum: {
                        $cond: [{ $ne: ["$selectedOption", "$correctAnswer"] }, 1, 0],
                    },
                },
                languageName: { $first: "$languageDetails.name" },
                user: { $first: "$user" },
            },
        },
        {
            $addFields: {
                score: {
                    $multiply: [{ $divide: ["$correctAnswers", "$totalQuestions"] }, 100],
                },
            },
        },
        {
            $project: {
                _id: 1,
                attempt: "$_id.attempt",
                user: 1,
                languageName: 1,
                totalQuestions: 1,
                correctAnswers: 1,
                wrongAnswers: 1,
                score: 1,
            },
        },
        {
            $sort: { attempt: 1 },
        },
    ]);

    try {
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteResult = async (req, res) => {
    const languageId = req.params.languageId;
    const attemptNo = req.params.attemptNo;
    try {
        const result = await Result.deleteMany({
            language: languageId,
            attemptNumber: attemptNo,
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};