import React from 'react';

export default function FeaturesSection() {
  return (
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
  );
}