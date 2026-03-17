import React from 'react';

export default function ProfileStatusBar({ p, t }) {
  return (
    <div className="status-bar-container">
      <div className="status-card streak-stat">
        <span className="status-icon">🔥</span>
        <div className="status-info">
          <span className="status-value">{p.streak || 0}</span>
          <span className="status-label">{t('profile.stats.streak')}</span>
        </div>
      </div>
      <div className="status-card xp-stat">
        <span className="status-icon">✨</span>
        <div className="status-info">
          <span className="status-value">{p.totalXp || 0}</span>
          <span className="status-label">{t('profile.stats.xp')}</span>
        </div>
      </div>
      <div className="status-card life-stat">
        <span className="status-icon">❤️</span>
        <div className="status-info">
          {/* ÚJ: Végtelen jel (∞) mutatása a prémium felhasználóknak egy picit nagyobb betűmérettel */}
          <span 
            className="status-value" 
            style={{ fontSize: p.isPremium ? '1.8rem' : 'inherit', lineHeight: p.isPremium ? '0.8' : 'inherit' }}
          >
            {p.isPremium ? '∞' : (p.hearts !== undefined ? p.hearts : 5)}
          </span>
          <span className="status-label">{t('profile.stats.health')}</span>
        </div>
      </div>
      <div className="status-card coin-stat">
        <span className="status-icon">💰</span>
        <div className="status-info">
          <span className="status-value">{p.coins || 0}</span>
          <span className="status-label">{t('profile.stats.coins')}</span>
        </div>
      </div>
    </div>
  );
}