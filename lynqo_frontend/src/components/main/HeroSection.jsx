import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function HeroSection({ user }) {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">{t('mainPage.hero.title')}</h1>
        <p className="hero-subtitle">
          {t('mainPage.hero.subtitle')}
        </p>
        <div className="hero-buttons">
          {user ? (
            <Link to="/pick-language" className="cta-button primary large">
              {t('mainPage.hero.continue')}
            </Link>
          ) : (
            <>
              <Link to="/register" className="cta-button primary">{t('mainPage.hero.getStarted')}</Link>
              <Link to="/login" className="cta-button secondary">{t('mainPage.hero.alreadyAccount')}</Link>
            </>
          )}
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-illustration"></div>
      </div>
    </section>
  );
}