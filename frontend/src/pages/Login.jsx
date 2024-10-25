import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username) {
      if (username.length > 2) {
        login(username);
        navigate("/languages");
        setError(null);
        setUsername("");
      } else {
        setError("Username must be 2 characters and above.");
      }
    } else {
      setError("Please provide your username.");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center">
      <div className="card login-card shadow-lg">
        <div className="card-body p-4">
          <h4 className="card-title text-center mb-4">Login to QuizApp</h4>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control login-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
              {error && <small className="text-danger">{error}</small>}
            </div>
            <button
              type="submit"
              className="btn btn-login w-100 mt-3 fw-bold shadow-none"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
