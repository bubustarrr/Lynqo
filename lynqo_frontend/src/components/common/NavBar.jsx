import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import './NavBar.css';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { language, setLanguage, translations } = useLanguage();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  const t = translations[language] || translations['en'];
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menuName) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const handleLogout = () => {
    logout();
    setActiveDropdown(null);
    navigate('/main');
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setActiveDropdown(null);
  };

  const handleThemeChange = (mode) => {
    toggleTheme(mode);
    setActiveDropdown(null);
  }

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-left">
        {user ? (
          <div className="dropdown-container">
            <button className={`nav-btn nav-btn-user ${activeDropdown === 'user' ? 'active' : ''}`} onClick={() => toggleDropdown('user')}>
              <span className="user-icon">👤</span>
              <span className="username">{user.username || user.email || "User"}</span>
              <span className="arrow">▼</span>
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'user' ? 'show' : ''}`}>
              <Link to="/settings" className="dropdown-item" onClick={() => setActiveDropdown(null)}>⚙️ {t.settings || "Settings"}</Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>🚪 {t.logout || "Log Out"}</button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="login-link">🔐 {t.login || "Login"}</Link>
        )}
      </div>

      <div className="navbar-center">
        <Link to="/main" className="navbar-logo">Lynqo</Link>
      </div>

      <div className="navbar-right">
        {/* TÉMA VÁLASZTÓ */}
        <div className="dropdown-container">
          <button className={`nav-btn nav-btn-icon ${activeDropdown === 'theme' ? 'active' : ''}`} onClick={() => toggleDropdown('theme')} title="Change Theme">
            🎨 <span className="arrow-mini">▼</span>
          </button>
          <div className={`dropdown-menu right-aligned ${activeDropdown === 'theme' ? 'show' : ''}`}>
            <button className="dropdown-item" onClick={() => handleThemeChange('light')}>☀️ Light Mode</button>
            <button className="dropdown-item" onClick={() => handleThemeChange('dark')}>🌑 Dark Mode</button>
          </div>
        </div>

        {/* NYELV VÁLASZTÓ */}
        <div className="dropdown-container">
          <button className={`nav-btn nav-btn-icon ${activeDropdown === 'lang' ? 'active' : ''}`} onClick={() => toggleDropdown('lang')} title="Select Language">
            🌐 <span className="arrow-mini">▼</span>
          </button>
          <div className={`dropdown-menu right-aligned ${activeDropdown === 'lang' ? 'show' : ''}`}>
            <button className={`dropdown-item ${language === 'en' ? 'active-lang' : ''}`} onClick={() => handleLanguageChange('en')}>🇺🇸 English</button>
            <button className={`dropdown-item ${language === 'es' ? 'active-lang' : ''}`} onClick={() => handleLanguageChange('es')}>🇪🇸 Español</button>
            <button className={`dropdown-item ${language === 'fr' ? 'active-lang' : ''}`} onClick={() => handleLanguageChange('fr')}>🇫🇷 Français</button>
            <button className={`dropdown-item ${language === 'de' ? 'active-lang' : ''}`} onClick={() => handleLanguageChange('de')}>🇩🇪 Deutsch</button>
          </div>
        </div>
      </div>
    </nav>
  );
}