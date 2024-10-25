import React from "react";
import { Link } from "react-router-dom";

const QuestionsNo = ({ questions, selectedOptions }) => {
  return (
    <div className="que-no-container border mt-4">
      <h5 className="border-bottom">Questions</h5>
      <ul className="list-unstyled">
        {questions.map((question, key) => (
          <li key={key}>
            <Link to={`/quiz/${question.language._id}?q=${key + 1}`} className="question-link">
              <span className="span-1">{key + 1}</span>
              {selectedOptions[question._id] ? (
                <span className="span-2 answered"></span>
              ) : (
                <span className="span-3 unanswer"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsNo;
