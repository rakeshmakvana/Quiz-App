import React, { useContext, useEffect, useState } from "react";
import CountdownTimer from "../components/CountdownTimer";
import Questions from "../components/Questions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthProvider";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [language, setLanguage] = useState("");
  const [quizTime, setQuizTime] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedOptions = localStorage.getItem("selectedOptions");
    return savedOptions ? JSON.parse(savedOptions) : {};
  });
  const [isQuizStarted, setIsQuizStarted] = useState(() => {
    const savedQuizState = localStorage.getItem("isQuizStarted");
    return savedQuizState === "true";
  });
  const [loading, setLoading] = useState(true);
  const { languageId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(`/api/question/101/${languageId}`);
        const data = response.data;                
        if (data.length === 0) {
          throw new Error("No questions found");
        }
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
        setLoading(false);
        navigate("/404");
      }
    };
    getQuestions();
  }, [languageId]);

  useEffect(() => {
    async function getLanguage() {
      try {
        const response = await axios.get(`/api/language/101/${languageId}`);
        const data = response.data;
        setLanguage(data[0].name);
        setQuizTime(data[0].time);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    }

    getLanguage();
  }, [languageId]);

  useEffect(() => {
    const savedEndTime = localStorage.getItem("endTime");
    const timerRunning = localStorage.getItem("isQuizStarted") === "true";

    if (timerRunning && savedEndTime) {
      const parsedEndTime = parseInt(savedEndTime, 10);
      if (parsedEndTime > new Date().getTime()) {
        setEndTime(parsedEndTime);
        setIsQuizStarted(true);
      } else {
        localStorage.removeItem("endTime");
        localStorage.removeItem("isQuizStarted");
      }
    } 
  }, []);

  const startQuiz = () => {
    const newEndTime = new Date().getTime() + quizTime * 60 * 1000;
    setEndTime(newEndTime);
    localStorage.setItem("endTime", newEndTime);
    localStorage.setItem("isQuizStarted", "true");
    setIsQuizStarted(true);
  };

  const handleSubmit = async () => {
    if (questions.length === 0) {
      console.log("No questions to submit.");
      setError("No questions to submit.");
      return;
    }
    const results = questions.map((question) => ({
      language: question.language._id,
      questionId: question._id,
      selectedOption: selectedOptions[question._id]
        ? selectedOptions[question._id]
        : null,
      correctAnswer: question.answer,
    }));

    console.log("Results to submit:", results);
    setSubmitting(true);

    try {
      const response = await axios.post("/api/result/100", {
        user,
        results,
      });
      const data = response.data;

      localStorage.removeItem("isQuizStarted");
      localStorage.removeItem("endTime");
      localStorage.removeItem("selectedOptions");
      setIsQuizStarted(false);
      setSelectedOptions({});
      navigate("/results");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-muted fw-bolder mt-3">Loading...</div>
    );
  }

  return (
    <main className="container-fluid quiz-page">
      <div className="row quiz-container bg-white mx-3 py-4">
        {error && <p>{error}</p>}
        <div className="col-md-11 d-flex justify-content-between border-2 border-bottom mx-auto">
          <div className="quiz-title">{language} Quiz</div>
          <div className="quiz-timer">
            <CountdownTimer
              endTime={endTime}
              isQuizStarted={isQuizStarted}
              selectedOptions={selectedOptions}
              startQuiz={startQuiz}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
        <div className="col-md-11 mx-auto mt-3">
          <div className="row">
            <Questions
              questions={questions}
              isQuizStarted={isQuizStarted}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              handleSubmit={handleSubmit}
              quizTime={quizTime}
              submitting={submitting}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Quiz;
