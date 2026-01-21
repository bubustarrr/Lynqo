import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = "John Doe";

  const handleLogoClick = () => navigate('/main');
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);
  const toggleLangDropdown = () => setLangDropdownOpen(!langDropdownOpen);

  const handleLogin = () => { navigate('/login'); setUserDropdownOpen(false); };
  const handleLogout = () => { setIsLoggedIn(false); navigate('/main'); setUserDropdownOpen(false); };
  const handleSettings = () => { navigate('/settings'); setUserDropdownOpen(false); };

  return (
    <nav className="navbar-container">
      {/* Left: User/Login Dropdown */}
      <div className="navbar-left">
        <div className="navbar-user-wrapper">
          <button className="navbar-user-btn" onClick={toggleUserDropdown}>
            {isLoggedIn ? userName : 'Login'}
            <span className="arrow-icon">▼</span>
          </button>
          {userDropdownOpen && (
            <div className="navbar-dropdown">
              {isLoggedIn ? (
                <>
                  <div className="dropdown-item" onClick={handleSettings}>⚙️ Settings</div>
                  <hr className="dropdown-divider" />
                  <div className="dropdown-item" onClick={handleLogout}>🚪 Logout</div>
                </>
              ) : (
                <div className="dropdown-item" onClick={handleLogin}>🔐 Login</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Center: Lynqo Logo */}
      <div className="navbar-center">
        <div className="navbar-logo" onClick={handleLogoClick}>
          Lynqo
        </div>
      </div>

      {/* Right: Theme Toggle + Language Dropdown */}
      <div className="navbar-right">
        <div className={`theme-toggle ${isDarkMode ? 'active' : ''}`} onClick={toggleTheme}>
          <div className="toggle-circle"></div>
        </div>
        <div className="navbar-lang-wrapper">
          <button className="navbar-lang-btn" onClick={toggleLangDropdown}>
            🌐 EN
            <span className="arrow-icon">▼</span>
          </button>
          {langDropdownOpen && (
            <div className="navbar-dropdown right">
              <div className="dropdown-item">🇺🇸 English</div>
              <div className="dropdown-item">🇪🇸 Español</div>
              <div className="dropdown-item">🇫🇷 Français</div>
              <div className="dropdown-item">🇩🇪 Deutsch</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
