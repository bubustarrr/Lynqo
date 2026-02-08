import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 
// Ha használnád a nyelvi kontextust, itt importáld vissza:
// import { useLanguage } from '../../context/LanguageContext'; 
import './NavBar.css';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Ha van nyelvi kontextusod, itt kérd le:
  // const { setLanguage } = useLanguage();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  // Bezárás, ha mellékattintasz
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

  // Segédfüggvény a nyelvváltáshoz (hogy bezárja a menüt is)
  const handleLanguageChange = (langCode) => {
    // setLanguage(langCode); // Ha van LanguageContext, ezt kapcsold be!
    console.log("Language changed to:", langCode); // Teszteléshez
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar" ref={navRef}>
      
      {/* --- BAL OLDAL --- */}
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
              <Link to="/settings" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                ⚙️ Settings
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                🚪 Log Out
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            🔐 Login
          </Link>
        )}
      </div>

      {/* --- KÖZÉP --- */}
      <div className="navbar-center">
        <Link to="/main" className="navbar-logo">Lynqo</Link>
      </div>

      {/* --- JOBB OLDAL --- */}
      <div className="navbar-right">
        
        {/* TÉMA */}
        <div className="dropdown-container">
          <button 
            className={`nav-btn nav-btn-icon ${activeDropdown === 'theme' ? 'active' : ''}`}
            onClick={() => toggleDropdown('theme')}
            title="Change Theme"
          >
            🎨 <span className="arrow-mini">▼</span>
          </button>
          
          <div className={`dropdown-menu right-aligned ${activeDropdown === 'theme' ? 'show' : ''}`}>
            <button className="dropdown-item" onClick={() => setActiveDropdown(null)}>☀️ Light Mode</button>
            <button className="dropdown-item" onClick={() => setActiveDropdown(null)}>🌑 Dark Mode</button>
            <button className="dropdown-item" onClick={() => setActiveDropdown(null)}>🦄 Unicorn Mode</button>
          </div>
        </div>

        
        <div className="dropdown-container">
          <button 
            className={`nav-btn nav-btn-icon ${activeDropdown === 'lang' ? 'active' : ''}`}
            onClick={() => toggleDropdown('lang')}
            title="Select Language"
          >
            🌐 <span className="arrow-mini">▼</span>
          </button>

          <div className={`dropdown-menu right-aligned ${activeDropdown === 'lang' ? 'show' : ''}`}>
            <button className="dropdown-item" onClick={() => handleLanguageChange('en')}>
              🇺🇸 English
            </button>
            <button className="dropdown-item" onClick={() => handleLanguageChange('es')}>
              🇪🇸 Español
            </button>
            <button className="dropdown-item" onClick={() => handleLanguageChange('fr')}>
              🇫🇷 Français
            </button>
            <button className="dropdown-item" onClick={() => handleLanguageChange('de')}>
              🇩🇪 Deutsch
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}