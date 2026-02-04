import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Corrupt user data in storage", error);
        localStorage.removeItem('user');
      }
    }
    if (storedToken) setToken(storedToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
    
    setLoading(false);
  }, []);

  // Updated login to accept refreshToken
  const login = (userData, jwtToken, refreshStr) => {
    setUser(userData);
    setToken(jwtToken);
    setRefreshToken(refreshStr);

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
    
    if (refreshStr) {
        localStorage.setItem('refreshToken', refreshStr);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
