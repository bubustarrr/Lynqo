import React from 'react';
import { useTranslation } from "react-i18next";

export default function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section className="features-section">
      <h2 className="section-title">{t('mainPage.features.title')}</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>{t('mainPage.features.p_learning.title')}</h3>
          <p>{t('mainPage.features.p_learning.desc')}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎮</div>
          <h3>{t('mainPage.features.gamified.title')}</h3>
          <p>{t('mainPage.features.gamified.desc')}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>{t('mainPage.features.languages.title')}</h3>
          <p>{t('mainPage.features.languages.desc')}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>{t('mainPage.features.anywhere.title')}</h3>
          <p>{t('mainPage.features.anywhere.desc')}</p>
        </div>
      </div>
    </section>
  );
}