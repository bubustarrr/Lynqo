import React from 'react';
import { Link } from 'react-router-dom';

export default function ExploreSection() {
  return (
    <section className="explore-section">
      <div className="explore-buttons-row">
        <Link to="/news" className="cta-button secondary">
          📰 Latest News
        </Link>
        <Link to="/shop" className="cta-button secondary">
          🛒 Lynqo Store
        </Link>
        <Link to="/leaderboard" className="cta-button secondary">
          🏆 Leaderboard
        </Link>
      </div>
    </section>
  );
}