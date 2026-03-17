import React from 'react';

export default function ProfileMainCard({ p, t, navigate, resolveMediaUrl }) {
  return (
    <div className="profile-main-card identity-card-layout">
      {/* VISSZATETTÜK A PROFILKÉPET! */}
      <div className="profile-img-wrapper">
        <img
          src={
            resolveMediaUrl(p.avatarUrl) ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              p.username || 'User'
            )}&background=random&color=fff&size=300`
          }
          alt="Profile"
          className="profile-avatar-img"
        />
      </div>

      <div className="identity-text-content">
        <div className="identity-header">
          <h3 className="display-name">{p.displayName || p.username}</h3>
          {p.isPremium && (
            <span className="premium-badge-mini">
              {t('profilePage.main_card.premium')}
            </span>
          )}
        </div>

        <p className="profile-email-display">{p.email}</p>
        <p className="member-since">
          {t('profilePage.main_card.member_since')}: {p.createdAt}
        </p>
      </div>

      <button
        className="settings-btn"
        onClick={() => navigate('/edit-profile')}
      >
        ✏️ {t('profilePage.main_card.edit_profile')}
      </button>
    </div>
  );
}