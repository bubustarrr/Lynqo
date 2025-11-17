import React from 'react';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className="welcome-grid">
      <div className="center-col">
        <div className="welcome-box">
          <h1>Welcome to Lynqo!</h1>
          <p className="slogan">Level up your language skills.</p>
          <div className="welcome-actions">
            <Link to="/login" className="btn btn-big">LOGIN</Link>
            <Link to="/register" className="btn btn-big">REGISTER</Link>
          </div>
          <div className="welcome-desc">
            Short description here
          </div>
        </div>
      </div>
    </div>
  );
}
