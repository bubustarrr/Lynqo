import React from 'react';

const mainNews = [
  {
    id: 1,
    title: "New Language Added: Japanese 🇯🇵",
    date: "February 8, 2026",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80", 
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

const FeaturedStories = () => {
  return (
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
  );
};

export default FeaturedStories;