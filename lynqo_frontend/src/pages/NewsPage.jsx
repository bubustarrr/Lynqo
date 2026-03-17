import React from 'react';
import { useTranslation } from 'react-i18next'; // Ezt importáljuk
import './NewsPage.css';
import BackButton from '../components/common/BackButton';
import FeaturedStories from '../components/news/FeaturedStories';
import PatchNotesUpdates from '../components/news/PatchNotesUpdates';

const NewsPage = () => {
  const { t } = useTranslation(); // Ezt hozzáadjuk

  return (
    <div className="news-page-container">
      <BackButton />

      <header className="news-header">
        <h1 className="news-hero-title">{t('newsPage.header_title')}</h1>
        <p className="news-subtitle">{t('newsPage.header_subtitle')}</p>
      </header>

      <div className="news-layout">
        <FeaturedStories />
        <PatchNotesUpdates />
      </div>
    </div>
  );
};

export default NewsPage;