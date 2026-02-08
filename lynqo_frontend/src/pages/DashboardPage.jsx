import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, logout } = useContext(AuthContext);

  // Ideiglenes adatok (ezeket később az adatbázisból is lekérheted)
  const stats = {
    streak: 0,
    xp: 0,
    hearts: 5,
    gems: 0,
    progress: 0
  };

  return (
    <div className="dashboard-container">
      
      {/* Üdvözlő fejléc */}
      <header className="dashboard-header">
        <h1>Welcome back, {user?.username || "Learner"}! 👋</h1>
        <div className="progress-container">
          <span className="progress-label">Course Progress: {stats.progress}%</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${stats.progress}%` }}></div>
          </div>
        </div>
      </header>

      {/* STATISZTIKA KÁRTYÁK - A 4 doboz */}
      {/* Most már grid-et használunk, ami kitölti a szélességet */}
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <span className="stat-value">{stats.streak}</span>
          <span className="stat-label">Day Streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⚡</span>
          <span className="stat-value">{stats.xp}</span>
          <span className="stat-label">Total XP</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">❤️</span>
          <span className="stat-value">{stats.hearts} / 5</span>
          <span className="stat-label">Hearts</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💎</span>
          <span className="stat-value">{stats.gems}</span>
          <span className="stat-label">Gems</span>
        </div>
      </section>

      {/* ALSÓ RÉSZ (Tartalom + Oldalsáv) */}
      <div className="content-grid">
        
        {/* Fő tartalom (Bal oldal) */}
        <div className="main-content-area">
          <div className="course-card">
            <div className="completion-icon">🎉</div>
            <h2>Course Complete!</h2>
            <p>You have finished all available lessons.</p>
            <button className="refresh-btn">Refresh to Check for Updates</button>
          </div>
        </div>

        {/* Oldalsáv (Jobb oldal) */}
        <aside className="sidebar">
          <div className="sidebar-card">
            <h3>📜 Daily Quests</h3>
            <p className="empty-state">No active quests today.</p>
          </div>

          <div className="sidebar-card">
            <h3>QUICK LINKS</h3>
            <div className="quick-links">
              <Link to="/settings" className="quick-link-btn">⚙️ Settings</Link>
              <Link to="/shop" className="quick-link-btn">🛒 Shop</Link>
              <button className="quick-link-btn">👥 Friends</button>
            </div>
            <button onClick={logout} className="logout-btn-small">🚪 Log Out</button>
          </div>
        </aside>

      </div>
    </div>
  );
}