import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default Auth;