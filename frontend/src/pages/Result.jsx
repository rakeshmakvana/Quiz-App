import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthProvider";
import { Link } from "react-router-dom";
import { MdOutlineCancel, MdOutlineViewList, MdQuiz } from "react-icons/md";

const Result = () => {
  const [result, setResult] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResult = async () => {
      try {
        const response = await axios.get(`/api/result/101/${user}`);
        const data = await response.data;
        setResult(data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getResult();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/result/102/${id.language}/${id.attempt}`);
      setResult((prevResults) => prevResults.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-muted fw-bolder mt-3">Loading...</div>
    );
  }

  return (
    <main className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="text-center text-black mb-3" style={{fontWeight:700}}>
          Results
        </h2>
        <Link to="/languages" className="btn btn-dark mb-3">
          <MdQuiz style={{ marginRight: "5px" }} /> Home
        </Link>
      </div>

      <div className="row">
        {result.length > 0 ? (
          result.map((item, key) => (
            <div className="col-md-4 mb-4" key={item._id.language + item._id.attempt}>
              <div className="result-card border-light h-100 shadow-sm p-4">
                <div className="card-body text-light">
                  <h5 className="card-title text-capitalize fw-bolder">{item.languageName}</h5>
                  <p className="card-text">
                    <strong>Attempts:</strong> {item.attempt}
                  </p>
                  <p className="card-text text-success">
                    <strong>Correct Answers:</strong> {item.correctAnswers}
                  </p>
                  <p className="card-text text-danger">
                    <strong>Wrong Answers:</strong> {item.wrongAnswers}
                  </p>
                  <p className="card-text text-primary">
                    <strong>Score:</strong> {item.score.toFixed(0)}%
                  </p>
                </div>
                <div className="card-footer text-center">
                  <button
                    className="btn btn-outline-danger delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdOutlineCancel style={{ fontSize: "17px" }} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <h5 className="text-center text-light">No results available</h5>
          </div>
        )}
      </div>
    </main>
  );
};

export default Result;
