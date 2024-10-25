import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Languages = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    async function getLanguages() {
      try {
        const response = await axios.get("/api/language/100");
        const data = await response.data;
        setLanguages(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getLanguages();
  }, []);

  const handleClick = () => {
    localStorage.removeItem("selectedOptions");
    localStorage.removeItem("isQuizStarted");
    localStorage.removeItem("endTime");
  };

  return (
    <main className="container my-5 languages-container">
      <h4 className="text-center mb-4" style={{ color: "#000", fontSize: 34, fontWeight: 700 }}>Select a Language</h4>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="row">
            {languages.length ? (
              languages.map((language) => (
                <div className="col-md-6 mb-4" key={language._id}>
                  <Link
                    to={`/quiz/${language._id}`}
                    className="text-decoration-none"
                    onClick={handleClick}
                  >
                    <div className="card language-card shadow-sm p-3">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">{language.name}</h5>
                        <span className="badge rounded-pill">
                          {language.time} min
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="card language-card text-center p-3 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title mb-0">No Languages Set</h5>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Languages;
