import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. LÉPÉS: Adunk neki egy "biztonsági" alapértéket, hogy ne szálljon el hibával,
// ha véletlenül provider nélkül hívnád meg.
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => console.log('ThemeContext provider hiányzik!'),
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      // Biztonságos localStorage olvasás
      const saved = localStorage.getItem('theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook a használathoz
export const useTheme = () => useContext(ThemeContext);