import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function ExploreSection() {
  const { t } = useTranslation();

  return (
    <section className="explore-section">
      <div className="explore-buttons-row">
        <Link to="/news" className="cta-button secondary">
          {t('mainPage.explore.news')}
        </Link>
        <Link to="/shop" className="cta-button secondary">
          {t('mainPage.explore.shop')}
        </Link>
        <Link to="/leaderboard" className="cta-button secondary">
          {t('mainPage.explore.leaderboard')}
        </Link>
      </div>
    </section>
  );
}