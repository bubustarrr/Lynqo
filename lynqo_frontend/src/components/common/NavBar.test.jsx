import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './NavBar';
import { AuthContext } from '../../context/AuthContext';

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn()
}), { virtual: true });

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      if (key === 'navbar.login') return 'Login';
      if (key === 'navbar.logout') return 'Log Out';
      return key;
    }
  })
}));

jest.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ 
    theme: 'dark', 
    toggleTheme: () => {} 
  })
}));

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