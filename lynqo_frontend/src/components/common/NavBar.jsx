import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n';


export default function NavBar() {
const { language, changeLanguage } = useLanguage();
const t = translations[language];


const [userDropdownOpen, setUserDropdownOpen] = useState(false);
const [langDropdownOpen, setLangDropdownOpen] = useState(false);
const [isDarkMode, setIsDarkMode] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);


const navigate = useNavigate();
const userName = "John Doe";


const userRef = useRef(null);
const langRef = useRef(null);


const handleLogoClick = () => navigate('/main');
const toggleTheme = () => setIsDarkMode(!isDarkMode);
const toggleUserDropdown = () => setUserDropdownOpen(prev => !prev);
const toggleLangDropdown = () => setLangDropdownOpen(prev => !prev);


const handleLogin = () => { navigate('/login'); setUserDropdownOpen(false); };
const handleLogout = () => { setIsLoggedIn(false); navigate('/main'); setUserDropdownOpen(false); };
const handleSettings = () => { navigate('/settings'); setUserDropdownOpen(false); };


useEffect(() => {
const handleClickOutside = (e) => {
if (userRef.current && !userRef.current.contains(e.target)) setUserDropdownOpen(false);
if (langRef.current && !langRef.current.contains(e.target)) setLangDropdownOpen(false);
};
document.addEventListener("mousedown", handleClickOutside);
return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


return (
<nav className="navbar-container">
{/* Left */}
<div className="navbar-left">
<div className="navbar-user-wrapper" ref={userRef}>
<button className="navbar-user-btn" onClick={toggleUserDropdown}>
{isLoggedIn ? userName : t.login} <span className="arrow-icon">▼</span>
</button>
{userDropdownOpen && (
<div className="navbar-dropdown">
{isLoggedIn ? (
<>
<div className="dropdown-item" onClick={handleSettings}>⚙️ {t.settings}</div>
<hr className="dropdown-divider"/>
<div className="dropdown-item" onClick={handleLogout}>🚪 {t.logout}</div>
</>
) : (
<div className="dropdown-item" onClick={handleLogin}>🔐 {t.login}</div>
)}
</div>
)}
</div>
</div>


{/* Center */}
<div className="navbar-center">
<div className="navbar-logo" onClick={handleLogoClick}>Lynqo</div>
</div>


{/* Right */}
<div className="navbar-right">
<div className={`theme-toggle ${isDarkMode ? 'active' : ''}`} onClick={toggleTheme}>
<div className="toggle-circle"></div>
</div>


<div className="navbar-lang-wrapper" ref={langRef}>
<button className="navbar-lang-btn" onClick={toggleLangDropdown}>
🌐 {t.language} <span className="arrow-icon">▼</span>
</button>
{langDropdownOpen && (
<div className="navbar-dropdown right">
<div className="dropdown-item" onClick={() => changeLanguage("en")}>🇺🇸 English</div>
<div className="dropdown-item" onClick={() => changeLanguage("es")}>🇪🇸 Español</div>
<div className="dropdown-item" onClick={() => changeLanguage("fr")}>🇫🇷 Français</div>
<div className="dropdown-item" onClick={() => changeLanguage("de")}>🇩🇪 Deutsch</div>
</div>
)}
</div>
</div>
</nav>
);
}