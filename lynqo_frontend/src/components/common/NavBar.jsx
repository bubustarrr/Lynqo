import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function Navbar({ user }) {
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  

  const languages = ["EN", "FR", "DE", "ES", "HU"];

  return (
    <nav className="navbar-container">
      {/* User Section */}
      <div className="navbar-user-section">
        <button
          onClick={() => setUserOpen(!userOpen)}
          className="navbar-user-btn"
        >
          {user ? user.username : "Not logged in"}
          <span className="arrow-icon">▾</span>
        </button>

        {userOpen && (
          <div className="navbar-dropdown">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setUserOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="dropdown-item"
                  onClick={() => setUserOpen(false)}
                >
                  Settings
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="dropdown-item"
                  onClick={() => setUserOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/settings"
                  className="dropdown-item"
                  onClick={() => setUserOpen(false)}
                >
                  Settings
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Logo */}
      <div className="navbar-logo">Lynqo</div>

      {/* Right Section */}
      <div className="navbar-right-section">
        <div className="navbar-language-wrapper">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="navbar-lang-btn"
          >
            Languages <span className="arrow-icon">▾</span>
          </button>

          {langOpen && (
            <div className="navbar-dropdown right">
              {languages.map((code) => (
                <div key={code} className="dropdown-item">
                  {code}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={`theme-toggle ${darkMode ? "active" : ""}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          <div className="toggle-circle"></div>
        </div>
      </div>
    </nav>
  );
}
