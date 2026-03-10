import React from 'react';

export default function Achievements({ t }) {
  return (
    <>
      <h2 className="column-title">{t('profile.achievements_title')}</h2>
      <div className="badges-grid">
        <div className="badge-card locked">
          <div className="badge-icon-circle">🔒</div>
          <div className="badge-details">
            <h4>{t('profile.badges.locked_title')}</h4>
            <p>{t('profile.badges.locked_desc')}</p>
          </div>
        </div>
      </div>
    </>
  );
}