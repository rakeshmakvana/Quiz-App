import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const login = (username) => {
    localStorage.setItem("user", username);
    setUser((u) => username);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser((u) => null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;