import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Mock data for badges
  const badges = [
    { id: 1, icon: '🔥', title: 'On Fire', desc: '7 Day Streak' },
    { id: 2, icon: '🦉', title: 'Early Bird', desc: 'Completed a lesson before 8am' },
    { id: 3, icon: '💎', title: 'Investor', desc: 'Earned 1000+ Coins' },
    { id: 4, icon: '⚔️', title: 'Warrior', desc: 'Won 5 PvP matches' },
  ];

  return (
    <div className="profile-page-container">
      <header className="profile-header">
        <h1 className="profile-hero-title">Dashboard</h1>
        
        {/* GAMIFIED STATUS BAR (Top) */}
        <div className="status-bar-container">
          <div className="status-card streak-stat">
            <span className="status-icon">🔥</span>
            <div className="status-info">
              <span className="status-value">{user?.streak || 12}</span>
              <span className="status-label">Day Streak</span>
            </div>
          </div>
          <div className="status-card xp-stat">
            <span className="status-icon">⚡</span>
            <div className="status-info">
              <span className="status-value">{user?.totalXp || "4,250"}</span>
              <span className="status-label">Total XP</span>
            </div>
          </div>
          <div className="status-card life-stat">
            <span className="status-icon">❤️</span>
            <div className="status-info">
              <span className="status-value">{user?.lives || 5}</span>
              <span className="status-label">Health</span>
            </div>
          </div>
          <div className="status-card coin-stat">
            <span className="status-icon">🪙</span>
            <div className="status-info">
              <span className="status-value">{user?.coins || 1250}</span>
              <span className="status-label">Coins</span>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-layout">
        
        {/* LEFT COLUMN: Identity & Badges */}
        <section className="main-profile-column">
          
          {/* Identity Card */}
          <div className="profile-main-card identity-card-layout">
            <div className="profile-img-wrapper">
              <img 
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"} 
                alt="Profile" 
                className="profile-avatar-img" 
              />
            </div>
            
            <div className="identity-text-content">
              <div className="identity-header">
                <h3 className="display-name">{user?.displayName || "Lynqo Master"}</h3>
                {user?.isPremium && <span className="premium-badge-mini">💎 PREMIUM</span>}
              </div>
              
              <p className="profile-email-display">{user?.email || "user@lynqo.com"}</p>
              <p className="member-since">Member since: {user?.createdAt || "Feb 2026"}</p>
            </div>

            <button className="settings-btn" onClick={() => navigate('/settings')}>
              ⚙️ Settings
            </button>
          </div>

          {/* BADGES SECTION */}
          <h2 className="column-title">Achievements</h2>
          <div className="badges-grid">
            {badges.map(badge => (
              <div key={badge.id} className="badge-card">
                <div className="badge-icon-circle">{badge.icon}</div>
                <div className="badge-details">
                  <h4>{badge.title}</h4>
                  <p>{badge.desc}</p>
                </div>
              </div>
            ))}
            {/* Empty slot example */}
            <div className="badge-card locked">
              <div className="badge-icon-circle">🔒</div>
              <div className="badge-details">
                <h4>Locked</h4>
                <p>Keep learning!</p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Social & Requests */}
        <aside className="profile-sidebar-column">
          <h2 className="column-title">Friend Requests</h2>
          <div className="sidebar-wrapper">
            <div className="update-card request-card">
              <div className="update-header">
                <span className="version-badge">New</span>
              </div>
              <div className="request-body">
                <div className="request-avatar"></div>
                <div>
                  <h4 className="update-title" style={{marginBottom: '2px'}}>Alex_Polyglot</h4>
                  <p className="update-details">Wants to be friends</p>
                </div>
              </div>
              <div className="request-buttons">
                <button className="accept-mini">Confirm</button>
                <button className="decline-mini">Delete</button>
              </div>
            </div>

            <h2 className="column-title" style={{marginTop: '25px'}}>Friends Online</h2>
            <div className="friends-list-container">
              {['Marco', 'Elena', 'Kevin'].map((name, i) => (
                <div key={i} className="update-card friend-item-row">
                   <div className="friend-status-dot"></div>
                   <p className="friend-name">{name}</p>
                </div>
              ))}
            </div>

            <div className="promo-card">
              <h3>Get Premium!</h3>
              <p>Unlimited lives, no ads, and exclusive badges.</p>
              <button className="discord-btn">Upgrade Now</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}