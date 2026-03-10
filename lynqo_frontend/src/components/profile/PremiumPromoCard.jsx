import React from 'react';

export default function PremiumPromoCard({ isPremium, t, navigate }) {
  if (isPremium) return null; // Ha már prémium, nem mutatjuk

  return (
    <div className="promo-card mt-4">
      <h3>{t('profile.promo.title')}</h3>
      <button 
        className="discord-btn"
        onClick={() => navigate('/shop/subscriptions')}
      >
        {t('profile.promo.btn')}
      </button>
    </div>
  );
}