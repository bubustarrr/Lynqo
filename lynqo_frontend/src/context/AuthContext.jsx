import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken') || null);

  const loading = false;

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  // 🔥 NEW: The function that secretly gets a new token behind the scenes
  const refreshAccessToken = async () => {
    try {
      // CHANGE THIS URL IF YOUR REFRESH ENDPOINT IS NAMED DIFFERENTLY
      const res = await fetch('https://localhost:7118/api/Auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }) 
      });

      if (!res.ok) throw new Error('Refresh failed');

      const data = await res.json();
      
      // Update state and storage with the new fresh token!
      setToken(data.token);
      localStorage.setItem('token', data.token);

      if (data.refreshToken) {
          setRefreshToken(data.refreshToken);
          localStorage.setItem('refreshToken', data.refreshToken);
      }

      return data.token;
    } catch (error) {
      console.error("Session expired entirely. Logging out.", error);
      logout(); // If the refresh token is also expired, kick them to login
      return null;
    }
  };

  // 🔥 NEW: The Magic Fetch Wrapper
  const authFetch = async (url, options = {}) => {
    // 1. Auto-inject the current token into the headers
    const currentToken = localStorage.getItem('token'); 
    if (!options.headers) options.headers = {};
    if (currentToken) {
        options.headers['Authorization'] = `Bearer ${currentToken}`;
    }

    // 2. Try the normal request
    let response = await fetch(url, options);

    // 3. If it failed because the token expired...
    if (response.status === 401 && localStorage.getItem('refreshToken')) {
      console.log("Token expired! Pausing to auto-refresh...");
      
      const newToken = await refreshAccessToken();

      // 4. If we successfully got a new token, retry the exact same request!
      if (newToken) {
        options.headers['Authorization'] = `Bearer ${newToken}`;
        response = await fetch(url, options);
      }
    }

    return response;
  };

  const login = (arg1, arg2, arg3) => {
    let userData, jwtToken, refreshStr;

    if (typeof arg1 === 'object' && arg1.token) {
        userData = arg1.user;
        jwtToken = arg1.token;
        refreshStr = arg1.refreshToken;
    } else {
        userData = arg1;
        jwtToken = arg2;
        refreshStr = arg3;
    }

    setUser(userData);
    setToken(jwtToken);
    setRefreshToken(refreshStr || null);

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
    if (refreshStr) localStorage.setItem('refreshToken', refreshStr);
    else localStorage.removeItem('refreshToken');
  };

  return (
    // Make sure authFetch is exported here at the bottom!
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout, loading, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};
