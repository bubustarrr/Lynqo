import React from 'react';

export default function PremiumPromoCard({ isPremium, t, navigate }) {
  if (isPremium) return null;

  return (
    <div className="promo-card mt-4">
      <h3>{t('profilePage.promo.title')}</h3>
      <button className="discord-btn" onClick={() => navigate('/shop/subscriptions')}>
        {t('profilePage.promo.btn')}
      </button>
    </div>
  );
}