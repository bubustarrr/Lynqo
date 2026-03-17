import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next'; // Erre váltottunk a biztos frissítésért
import { useTheme } from '../../context/ThemeContext';
import './NavBar.css';

export default function NavBar() {
  const { t } = useTranslation(); // Az i18next hookja automatikusan újratölt, ha nyelvet váltasz
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
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

  const getProfileImageUrl = () => {
    const picUrl = user?.profilepicurl || user?.profilePicUrl || user?.ProfilePicUrl || user?.profilePictureUrl;
    if (picUrl && picUrl.trim() !== "" && picUrl !== "null") {
      if (picUrl.startsWith('http://') || picUrl.startsWith('https://')) return picUrl;
      let cleanPath = picUrl;
      if (!cleanPath.includes('media/images/profile_pictures')) {
        const safePicUrl = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
        cleanPath = `/media/images/profile_pictures/${safePicUrl}`;
      } else if (!cleanPath.startsWith('/')) {
        cleanPath = `/${cleanPath}`;
      }
      return `https://localhost:7118${cleanPath}`;
    }
    const nameToUse = user?.username || user?.email || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nameToUse)}&background=6366f1&color=fff&rounded=true&bold=true`;
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
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }} 
            >
              <div style={{
                width: '32px', height: '32px', minWidth: '32px', 
                overflow: 'hidden', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#333'
              }}>
                <img 
                  src={getProfileImageUrl()} 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null; 
                    const nameToUse = user?.username || user?.email || 'User';
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nameToUse)}&background=6366f1&color=fff&rounded=true&bold=true`;
                  }}
                />
              </div>
              <span className="username">{user.username || user.email || "User"}</span>
              <span className="arrow">▼</span>
            </button>
            
            <div className={`dropdown-menu ${activeDropdown === 'user' ? 'show' : ''}`}>
              <Link to="/profile" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                👤 {t('navbar.profile')}
              </Link>
              <Link to="/settings" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                ⚙️ {t('navbar.settings')}
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                  🚪 {t('navbar.logout')}
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="login-link">🔐 {t('navbar.login')}</Link>
        )}
      </div>

      {/* CENTER */}
      <div className="navbar-center">
        <Link to="/main" className="navbar-logo">Lynqo</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-right">
        <div className="theme-switch-wrapper">
          <label className="theme-switch">
            <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
            <div className="theme-switch-slider">
              <span className="switch-icon sun">☀️</span>
              <span className="switch-icon moon">🌙</span>
              <div className="switch-thumb"></div>
            </div>
          </label>
        </div>
      </div>
    </nav>
  );
}