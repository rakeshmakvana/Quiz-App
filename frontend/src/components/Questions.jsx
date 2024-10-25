import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import QuestionsNo from "../components/QuestionNo";
import Instructions from "../components/Instructions";

const Questions = ({
  questions,
  isQuizStarted,
  selectedOptions,
  setSelectedOptions,
  handleSubmit,
  quizTime,
  submitting,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [allquestion, setAllQuestion] = useState([]);

  useEffect(() => {
    setAllQuestion(questions);
  }, [questions]);

  useEffect(() => {
    let questionNo = searchParams.get("q");
    if (questionNo) {
      questionNo = parseInt(questionNo, 10) - 1;
      if (questionNo >= 0 && questionNo < allquestion.length) {
        setQuestionIndex(questionNo);
      }
    }
  }, [searchParams, allquestion]);

  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  const handleNext = () => {
    if (questionIndex < allquestion.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSearchParams({ q: questionIndex + 2 });
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setSearchParams({ q: questionIndex });
    }
  };

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = {
        ...prevSelectedOptions,
        [questionId]: option,
      };
      localStorage.setItem("selectedOptions", JSON.stringify(newSelectedOptions));
      return newSelectedOptions;
    });
  };

  const handleResultSubmit = () => {
    handleSubmit();
  };

  return (
    <>
      {!isQuizStarted ? (
        <Instructions quizTime={quizTime} />
      ) : (
        <>
          <div className="col-md-7 questions">
            {allquestion.length > 0 ? (
              <div key={allquestion[questionIndex]._id} className="question-card">
                <h4 className="question-text">
                  {questionIndex + 1}. {allquestion[questionIndex].question}
                </h4>
                <ul className="options list-unstyled">
                  {Object.entries(allquestion[questionIndex].options).map(
                    ([key, value]) => (
                      <li className="d-flex gap-2 my-3" key={key}>
                        <input
                          type="radio"
                          id={`option${key}`}
                          name={`option${allquestion[questionIndex]._id}`}
                          className="option-radio"
                          checked={
                            selectedOptions[allquestion[questionIndex]._id] === key
                          }
                          onChange={() =>
                            handleOptionChange(
                              allquestion[questionIndex]._id,
                              key
                            )
                          }
                        />
                        <label className="radio-label" htmlFor={`option${key}`}>
                          {key}. {value}
                        </label>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <h4>No questions set</h4>
            )}
            <div className="action-btns">
              <button
                className={questionIndex === 0 ? "d-none" : "btn btn-secondary"}
                onClick={handlePrev}
                disabled={questionIndex === 0}
              >
                Previous
              </button>
              <button
                className={
                  questionIndex === allquestion.length - 1 ? "btn btn-primary" : "btn btn-success"
                }
                onClick={
                  questionIndex === allquestion.length - 1
                    ? handleResultSubmit
                    : handleNext
                }
                disabled={submitting || allquestion.length === 0}
              >
                {questionIndex === allquestion.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
          <div className="col-md-4 questions-no mx-auto">
            <QuestionsNo
              questions={allquestion}
              selectedOptions={selectedOptions}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Questions;
