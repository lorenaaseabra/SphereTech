import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });

  const login = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = () => useContext(AuthContext);
