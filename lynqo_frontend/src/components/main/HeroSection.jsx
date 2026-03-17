import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection({ user }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Learn Languages with Lynqo</h1>
        <p className="hero-subtitle">
          Master new languages through fun, interactive lessons. Join millions of learners worldwide!
        </p>
        <div className="hero-buttons">
          {user ? (
            <Link to="/pick-language" className="cta-button primary large">
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
  );
}