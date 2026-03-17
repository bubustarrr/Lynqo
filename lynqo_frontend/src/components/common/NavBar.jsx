import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import './NavBar.css';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { language, translations } = useLanguage();
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

  // Function to resolve the correct image URL or generate one!
  const getProfileImageUrl = () => {
    const picUrl = user?.profilepicurl || user?.profilePicUrl || user?.ProfilePicUrl || user?.profilePictureUrl;
    
    // 1. PRIMARY METHOD
    if (picUrl && picUrl.trim() !== "" && picUrl !== "null") {
      // Ha már egy teljes link (pl. külső szolgáltatótól)
      if (picUrl.startsWith('http://') || picUrl.startsWith('https://')) {
        return picUrl;
      }
      
      // JAVÍTÁS: Kiegészítjük az ASP.NET Core wwwroot mappastruktúrájával
      let cleanPath = picUrl;
      if (!cleanPath.includes('media/images/profile_pictures')) {
        // Levágjuk a kezdő perjelt ha van, majd hozzáfűzzük a teljes útvonalat
        const safePicUrl = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
        cleanPath = `/media/images/profile_pictures/${safePicUrl}`;
      } else if (!cleanPath.startsWith('/')) {
        // Ha benne van a mappa, de hiányzik a perjel az elejéről
        cleanPath = `/${cleanPath}`;
      }
      
      return `https://localhost:7118${cleanPath}`;
    }
    
    // 2. FALLBACK METHOD
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
                width: '32px', 
                height: '32px', 
                minWidth: '32px', 
                overflow: 'hidden', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#333'
              }}>
                <img 
                  src={getProfileImageUrl()} 
                  alt={`${user.username || "User"}'s profile`} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    // Ha még mindig hiba van a kép betöltésével, akkor visszavált a generáltra
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
      </div>
    </nav>
  );
}