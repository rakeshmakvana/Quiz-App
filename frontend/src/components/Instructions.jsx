import React from "react";

const QuizInstructions = ({ quizTime }) => {
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-lg-8 col-md-10">
        <div className="card quiz-instructions-card shadow-sm p-4">
          <div className="card-header text-white bg-dark">
            <h5 className="mb-0 text-center">Quiz Instructions</h5>
          </div>
          <div className="card-body bg-light p-4">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h6 className="mb-1">1. Read Questions Carefully</h6>
              </li>
              <li className="list-group-item">
                <h6 className="mb-1">
                  2. Manage Your Time: <b>{quizTime} min</b>
                </h6>
              </li>
              <li className="list-group-item">
                <h6 className="mb-1">3. Answer All Questions</h6>
              </li>
              <li className="list-group-item">
                <h6 className="mb-1">4. Review Your Answers</h6>
              </li>
              <li className="list-group-item">
                <h6 className="mb-1">5. Submit Your Quiz</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;
