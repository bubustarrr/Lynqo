import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NavBar from './NavBar';
import { AuthContext } from '../../context/AuthContext';

// 1. A JAVÍTÁS: Teljesen mockoljuk a react-router-dom-ot!
// Így a Jest nem keresi a node_modules-ban, hanem ezt a "kamu" routert használja.
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn()
}), { virtual: true });

// 2. Mockoljuk a Custom Hookokat
jest.mock('../../context/LanguageContext', () => ({
  useLanguage: () => ({ 
    language: 'en', 
    translations: { en: { login: 'Login', logout: 'Log Out' } } 
  })
}));

jest.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ 
    theme: 'dark', 
    toggleTheme: () => {} 
  })
}));

// Segédfüggvény: Most már NEM KELL a <BrowserRouter> csomagolás!
const renderNavBar = (authValue) => {
  return render(
    <AuthContext.Provider value={authValue}>
      <NavBar />
    </AuthContext.Provider>
  );
};

describe('NavBar Component', () => {
  it('a Login gombot mutatja, ha nincs bejelentkezve felhasználó', () => {
    renderNavBar({ user: null, logout: jest.fn() });
    
    expect(screen.getByText('🔐 Login')).toBeInTheDocument();
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
  });

  it('a felhasználó nevét mutatja és kezeli a kijelentkezést, ha be van jelentkezve', () => {
    const mockLogout = jest.fn();
    const mockUser = { username: 'TestGamer', profilepicurl: null };

    renderNavBar({ user: mockUser, logout: mockLogout });
    
    expect(screen.getByText('TestGamer')).toBeInTheDocument();

    const userDropdownBtn = screen.getByRole('button', { name: /TestGamer/i });
    fireEvent.click(userDropdownBtn);

    const logoutBtn = screen.getByText('🚪 Log Out');
    fireEvent.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});