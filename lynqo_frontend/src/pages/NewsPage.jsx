import React from 'react';
import './NewsPage.css';
import BackButton from '../components/common/BackButton';
import FeaturedStories from '../components/news/FeaturedStories';
import PatchNotesUpdates from '../components/news/PatchNotesUpdates';

const NewsPage = () => {
  return (
    <div className="news-page-container">
      <BackButton />

      <header className="news-header">
        <h1 className="news-hero-title">Latest News & Updates</h1>
        <p className="news-subtitle">Stay up to date with the latest features, languages, and community events.</p>
      </header>

      <div className="news-layout">
        {/* BAL OLDAL - Kiszervezve */}
        <FeaturedStories />

        {/* JOBB OLDAL - Kiszervezve */}
        <PatchNotesUpdates />
      </div>
    </div>
  );
};

export default NewsPage;