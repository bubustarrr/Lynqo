import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './MainPage.css';

export default function MainPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="main-page-container">
      
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Learn Languages with Lynqo</h1>
          <p className="hero-subtitle">
            Master new languages through fun, interactive lessons. Join millions of learners worldwide!
          </p>
          <div className="hero-buttons">
            {user ? (
              <Link to="/dashboard" className="cta-button primary large">
                🚀 Continue Learning (Go to Dashboard)
              </Link>
            ) : (
              <>
                <Link to="/register" className="cta-button primary">Get Started</Link>
                <Link to="/login" className="cta-button secondary">I Already Have an Account</Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-illustration"></div>
        </div>
      </section>
      
      <section className="features-section">
        <h2 className="section-title">Why Choose Lynqo?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Personalized Learning</h3>
            <p>Adaptive lessons tailored to your pace and goals.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>Gamified Experience</h3>
            <p>Earn points, unlock achievements, and stay motivated.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Multiple Languages</h3>
            <p>Learn Spanish, French, German, and more.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Learn Anywhere</h3>
            <p>Access lessons on desktop, mobile, and tablet.</p>
          </div>
        </div>
      </section>
      
      <section className="admin-section">
        <h2 className="section-title">🛠️ Admin Testing (Development)</h2>
        <div className="admin-buttons">
          <Link to="/main" className="admin-btn">🏠 Main Page</Link>
          <Link to="/register" className="admin-btn">📝 Register</Link>
          <Link to="/login" className="admin-btn">🔐 Login</Link>
          <Link to="/settings" className="admin-btn">⚙️ Settings</Link>
          <Link to="/shop" className="admin-btn">🛒 Shop</Link>
          <Link to="/news" className="admin-btn">📰 News</Link>
          {user && <Link to="/dashboard" className="admin-btn">💎 Dashboard</Link>}
        </div>
      </section>
    </div>
  );
}