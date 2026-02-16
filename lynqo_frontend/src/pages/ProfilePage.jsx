import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. Import hook
import { AuthContext } from '../context/AuthContext';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation(); // 2. Initialize hook

  // 3. Move badges INSIDE component to use translation hook
  const badges = [
    { id: 1, icon: '🔥', title: t('profile.badges.fire_title'), desc: t('profile.badges.fire_desc') },
    { id: 2, icon: '🦉', title: t('profile.badges.bird_title'), desc: t('profile.badges.bird_desc') },
    { id: 3, icon: '💎', title: t('profile.badges.investor_title'), desc: t('profile.badges.investor_desc') },
    { id: 4, icon: '⚔️', title: t('profile.badges.warrior_title'), desc: t('profile.badges.warrior_desc') },
  ];

  return (
    <div className="profile-page-container">
      <header className="profile-header">
        <h1 className="profile-hero-title">{t('profile.dashboard')}</h1>
        
        {/* GAMIFIED STATUS BAR */}
        <div className="status-bar-container">
          <div className="status-card streak-stat">
            <span className="status-icon">🔥</span>
            <div className="status-info">
              <span className="status-value">{user?.streak || 12}</span>
              <span className="status-label">{t('profile.stats.streak')}</span>
            </div>
          </div>
          <div className="status-card xp-stat">
            <span className="status-icon">⚡</span>
            <div className="status-info">
              <span className="status-value">{user?.totalXp || "4,250"}</span>
              <span className="status-label">{t('profile.stats.xp')}</span>
            </div>
          </div>
          <div className="status-card life-stat">
            <span className="status-icon">❤️</span>
            <div className="status-info">
              <span className="status-value">{user?.lives || 5}</span>
              <span className="status-label">{t('profile.stats.health')}</span>
            </div>
          </div>
          <div className="status-card coin-stat">
            <span className="status-icon">🪙</span>
            <div className="status-info">
              <span className="status-value">{user?.coins || 1250}</span>
              <span className="status-label">{t('profile.stats.coins')}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-layout">
        
        {/* LEFT COLUMN */}
        <section className="main-profile-column">
          
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
                {user?.isPremium && <span className="premium-badge-mini">{t('profile.premium_badge')}</span>}
              </div>
              
              <p className="profile-email-display">{user?.email || "user@lynqo.com"}</p>
              <p className="member-since">{t('profile.member_since')}: {user?.createdAt || "Feb 2026"}</p>
            </div>

            <button className="settings-btn" onClick={() => navigate('/settings')}>
              ⚙️ {t('profile.settings_btn')}
            </button>
          </div>

          {/* BADGES SECTION */}
          <h2 className="column-title">{t('profile.achievements_title')}</h2>
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
            
            <div className="badge-card locked">
              <div className="badge-icon-circle">🔒</div>
              <div className="badge-details">
                <h4>{t('profile.badges.locked_title')}</h4>
                <p>{t('profile.badges.locked_desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="profile-sidebar-column">
          <h2 className="column-title">{t('profile.sidebar.requests_title')}</h2>
          <div className="sidebar-wrapper">
            <div className="update-card request-card">
              <div className="update-header">
                <span className="version-badge">{t('profile.sidebar.new_badge')}</span>
              </div>
              <div className="request-body">
                <div className="request-avatar"></div>
                <div>
                  <h4 className="update-title" style={{marginBottom: '2px'}}>Alex_Polyglot</h4>
                  <p className="update-details">{t('profile.sidebar.request_msg')}</p>
                </div>
              </div>
              <div className="request-buttons">
                <button className="accept-mini">{t('profile.sidebar.confirm')}</button>
                <button className="decline-mini">{t('profile.sidebar.delete')}</button>
              </div>
            </div>

            <h2 className="column-title" style={{marginTop: '25px'}}>{t('profile.sidebar.friends_online')}</h2>
            <div className="friends-list-container">
              {['Marco', 'Elena', 'Kevin'].map((name, i) => (
                <div key={i} className="update-card friend-item-row">
                   <div className="friend-status-dot"></div>
                   <p className="friend-name">{name}</p>
                </div>
              ))}
            </div>

            <div className="promo-card">
              <h3>{t('profile.promo.title')}</h3>
              <p>{t('profile.promo.desc')}</p>
              <button className="discord-btn">{t('profile.promo.btn')}</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}