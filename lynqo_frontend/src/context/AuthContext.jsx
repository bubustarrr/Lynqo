import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Load User Instantly (Lazy Initialization)
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Corrupt user data in storage", error);
      localStorage.removeItem('user');
      return null;
    }
  });

  // 2. Load Token Instantly
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  
  // 3. Load Refresh Token Instantly
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken') || null);

  // Loading is no longer needed because state is ready on first render!
  // But we keep it false for compatibility.
  const loading = false;

  // --- LOGIN FUNCTION (FIXED) ---
  // Accepts either (userData, token, refresh) OR (loginResponseObject)
  const login = (arg1, arg2, arg3) => {
    let userData, jwtToken, refreshStr;

    if (typeof arg1 === 'object' && arg1.token) {
        // Case 1: Called with ONE object { user: {...}, token: "..." }
        // This is how RegisterPage calls it!
        userData = arg1.user;
        jwtToken = arg1.token;
        refreshStr = arg1.refreshToken;
    } else {
        // Case 2: Called with separate arguments (userData, token, refresh)
        userData = arg1;
        jwtToken = arg2;
        refreshStr = arg3;
    }

    // Update State
    setUser(userData);
    setToken(jwtToken);
    setRefreshToken(refreshStr || null);

    // Persist to Storage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
    
    if (refreshStr) {
        localStorage.setItem('refreshToken', refreshStr);
    } else {
        localStorage.removeItem('refreshToken');
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
      {children}
    </AuthContext.Provider>
  );
};
