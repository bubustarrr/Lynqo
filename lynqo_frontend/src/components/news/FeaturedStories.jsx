import React from 'react';
import { useTranslation } from 'react-i18next'; // Import
import paris from '../../assets/news/paris.png';
import leaderb from '../../assets/news/leaderboard.png';
import community from '../../assets/news/community.png';

// Itt már csak az egyedi ID-t, a képet, és a fordítási kulcsot tároljuk!
const mainNews = [
  { id: 1, translationKey: "french_added", image: paris },
  { id: 2, translationKey: "leaderboards", image: leaderb },
  { id: 3, translationKey: "community_event", image: community }
];

const FeaturedStories = () => {
  const { t } = useTranslation();

  return (
    <section className="main-news-column">
      <h2 className="column-title">{t('newsPage.featured_title')}</h2>
      <div className="news-grid">
        {mainNews.map((news) => (
          <article key={news.id} className="big-news-card">
            <div className="news-image-wrapper">
              <img src={news.image} alt={t(`newsPage.articles.${news.translationKey}.title`)} className="news-img" />
              <span className="news-tag">{t(`newsPage.articles.${news.translationKey}.tag`)}</span>
            </div>
            <div className="news-content">
              <span className="news-date">{t(`newsPage.articles.${news.translationKey}.date`)}</span>
              <h3 className="news-title">{t(`newsPage.articles.${news.translationKey}.title`)}</h3>
              <p className="news-desc">{t(`newsPage.articles.${news.translationKey}.desc`)}</p>
              <button className="read-more-btn">{t('newsPage.read_more')}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedStories;