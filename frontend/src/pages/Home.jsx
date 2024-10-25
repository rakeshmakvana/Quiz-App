import React, { useContext } from "react";
import Login from "./Login";
import { AuthContext } from "../components/AuthProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <main className="container d-flex justify-content-center mt-5">
      <div className="row home-container shadow-lg p-5 rounded">
        <div className="col text-center">
          {user ? (
            <>
              <h2 className="welcome-text mb-3">Welcome to Your Profile</h2>
              <p className="lead">
                You are logged in as{" "}
                <strong className="username text-capitalize">{user}</strong>
              </p>
              <p className="text-muted">Manage your account and preferences here.</p>
              <Link to="/results" className="btn btn-outline-light btn-lg mt-2">
                View Result
              </Link>
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
