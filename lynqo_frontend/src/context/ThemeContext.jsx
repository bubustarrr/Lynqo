import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');

  const toggleTheme = (selectedTheme) => {
    const newTheme = selectedTheme ? selectedTheme : (theme === 'light' ? 'dark' : 'light');
    setTheme(newTheme);
    localStorage.setItem('appTheme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);