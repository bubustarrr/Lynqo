import React from 'react';
import './NewsPage.css';

const NewsPage = () => {
  // Példa adatok a nagy hírekhez
  const mainNews = [
    {
      id: 1,
      title: "New Language Added: Japanese 🇯🇵",
      date: "February 8, 2026",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80", // Helyettesítő kép
      description: "We are excited to announce that Japanese is now available on Lynqo! Start learning Hiragana, Katakana, and Kanji today with our new interactive lessons.",
      tag: "New Content"
    },
    {
      id: 2,
      title: "Global Leaderboards are Live! 🏆",
      date: "February 1, 2026",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      description: "Compete with learners from around the world. Earn XP, climb the ranks, and show off your language mastery on the new global leaderboards.",
      tag: "Feature"
    },
    {
      id: 3,
      title: "Community Events: Spring Challenge",
      date: "January 25, 2026",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      description: "Join the Spring Challenge to earn exclusive badges and merchandise discounts. Complete 30 lessons in 30 days!",
      tag: "Event"
    }
  ];

  // Példa adatok a jobb oldali sávhoz (Updates/Patch notes)
  const updates = [
    {
      id: 1,
      version: "v2.4.1",
      title: "Bug Fixes & Performance",
      date: "2 days ago",
      details: "Fixed audio sync issues in French lessons and improved loading times on mobile."
    },
    {
      id: 2,
      version: "v2.4.0",
      title: "Dark Mode Improvements",
      date: "1 week ago",
      details: "Enhanced contrast for better readability in night mode."
    },
    {
      id: 3,
      version: "v2.3.5",
      title: "Shop Update",
      date: "2 weeks ago",
      details: "New avatar frames added to the shop."
    }
  ];

  return (
    <div className="news-page-container">
      <header className="news-header">
        <h1 className="news-hero-title">Latest News & Updates</h1>
        <p className="news-subtitle">Stay up to date with the latest features, languages, and community events.</p>
      </header>

      <div className="news-layout">
        {/* BAL OLDAL - Nagy Hírek (2/3) */}
        <section className="main-news-column">
          <h2 className="column-title">Featured Stories</h2>
          <div className="news-grid">
            {mainNews.map((news) => (
              <article key={news.id} className="big-news-card">
                <div className="news-image-wrapper">
                  <img src={news.image} alt={news.title} className="news-img" />
                  <span className="news-tag">{news.tag}</span>
                </div>
                <div className="news-content">
                  <span className="news-date">{news.date}</span>
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-desc">{news.description}</p>
                  <button className="read-more-btn">Read More</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* JOBB OLDAL - Kisebb hírek / Updates (1/3) */}
        <aside className="sidebar-column">
          <h2 className="column-title">Patch Notes & Updates</h2>
          <div className="sidebar-wrapper">
            {updates.map((update) => (
              <div key={update.id} className="update-card">
                <div className="update-header">
                  <span className="version-badge">{update.version}</span>
                  <span className="update-date">{update.date}</span>
                </div>
                <h4 className="update-title">{update.title}</h4>
                <p className="update-details">{update.details}</p>
              </div>
            ))}
            
            {/* Opcionális: Egyéb kis doboz a jobb oldalon */}
            <div className="promo-card">
              <h3>Join the Discord!</h3>
              <p>Chat with other learners and developers.</p>
              <button className="discord-btn">Join Now</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsPage;