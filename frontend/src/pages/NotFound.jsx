import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/languages");
  };

  return (
    <main className="container d-flex justify-content-center mt-5">
      <div className="card text-center shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h1 className="display-1" style={{ color: "#000" }}>404</h1>
          <p className="card-text" style={{ color: "#555" }}>
            Oops! The page you are looking for doesn't exist.
          </p>
          <button
            className="btn btn-outline-dark btn-lg"
            onClick={handleNavigate}
          >
            Go Back Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
