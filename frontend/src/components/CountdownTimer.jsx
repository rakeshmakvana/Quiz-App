import React, { useState, useEffect } from "react";

const CountdownTimer = ({
  endTime,
  isQuizStarted,
  startQuiz,
  handleSubmit,
}) => {
  const calculateTimeLeft = () => {
    if (!endTime) return { minutes: 0, seconds: 0 };

    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference <= 0) {
      return { minutes: 0, seconds: 0 };
    }

    return {
      minutes: Math.floor(difference / 1000 / 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!endTime || !isQuizStarted) return;

    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);

      if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        handleSubmit();
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [endTime, isQuizStarted]);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="countdown-timer">
      {isQuizStarted ? (
        <div className="timer-display">
          <span className="time">{formatTime(timeLeft.minutes)}:</span>
          <span className="time">{formatTime(timeLeft.seconds)}</span>
        </div>
      ) : (
        <button className="start-quiz-btn btn-outline-light" onClick={startQuiz}>
          Start Quiz
        </button>
      )}
    </div>
  );
};

export default CountdownTimer;
