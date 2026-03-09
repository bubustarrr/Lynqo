import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import './NavBar.css';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { language, setLanguage, translations } = useLanguage();
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const t = translations[language] || translations['en'] || {};
  
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
    i18n.changeLanguage(langCode);
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar" ref={navRef}>
      
      {/* LEFT SIDE */}
      <div className="navbar-left">
        {user ? (
          <div className="dropdown-container">
            <button 
              className={`nav-btn nav-btn-user ${activeDropdown === 'user' ? 'active' : ''}`} 
              onClick={() => toggleDropdown('user')}
            >
              <span className="user-icon">👤</span>
              <span className="username">{user.username || user.email || "User"}</span>
              <span className="arrow">▼</span>
            </button>
            
            <div className={`dropdown-menu ${activeDropdown === 'user' ? 'show' : ''}`}>
              <Link to="/profile" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
               👤 {t.profile || "Profile"}
              </Link>
              <Link to="/settings" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
               ⚙️ {t.settings || "Settings"}
              </Link>
                  <div className="dropdown-divider"></div>
                     <button className="dropdown-item logout" onClick={handleLogout}>
                         🚪 {t.logout || "Log Out"}
                     </button>
                  </div>
          </div>
        ) : (
          <Link to="/login" className="login-link">🔐 {t.login || "Login"}</Link>
        )}
      </div>

      {/* CENTER */}
      <div className="navbar-center">
        <Link to="/main" className="navbar-logo">Lynqo</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-right">
        
        {/* ÚJ THEME SWITCH */}
        <div className="theme-switch-wrapper">
          <label className="theme-switch">
            <input 
              type="checkbox" 
              checked={theme === 'dark'} 
              onChange={toggleTheme} 
            />
            <div className="theme-switch-slider">
              <span className="switch-icon sun">☀️</span>
              <span className="switch-icon moon">🌙</span>
              <div className="switch-thumb"></div>
            </div>
          </label>
        </div>

        {/* NYELVVÁLASZTÓ */}
        <div className="dropdown-container">
          <button 
            className={`nav-btn nav-btn-icon ${activeDropdown === 'lang' ? 'active' : ''}`} 
            onClick={() => toggleDropdown('lang')} 
          >
            🌐 <span className="arrow-mini">▼</span>
          </button>
          
          <div className={`dropdown-menu right-aligned ${activeDropdown === 'lang' ? 'show' : ''}`}>
            <button className={`dropdown-item ${language === 'en' ? 'active-item' : ''}`} onClick={() => handleLanguageChange('en')}>🇺🇸 English</button>
            <button className={`dropdown-item ${language === 'es' ? 'active-item' : ''}`} onClick={() => handleLanguageChange('es')}>🇪🇸 Español</button>
            <button className={`dropdown-item ${language === 'fr' ? 'active-item' : ''}`} onClick={() => handleLanguageChange('fr')}>🇫🇷 Français</button>
            <button className={`dropdown-item ${language === 'de' ? 'active-item' : ''}`} onClick={() => handleLanguageChange('de')}>🇩🇪 Deutsch</button>
          </div>
        </div>
      </div>
    </nav>
  );
}