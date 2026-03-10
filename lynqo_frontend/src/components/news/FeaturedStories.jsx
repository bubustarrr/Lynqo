import React from 'react';
import paris from '../../assets/news/paris.png';
import leaderb from '../../assets/news/leaderboard.png';
import community from '../../assets/news/community.png';

const mainNews = [
  {
    id: 1,
    title: "New Language Added:  French FR",
    date: "February 8, 2026",
    image: paris, 
    description: "We are excited to announce that French is now available on Lynqo! Start learning today with our new interactive lessons.",
    tag: "New Content"
  },
  {
    id: 2,
    title: "Global Leaderboards are Live! 🏆",
    date: "February 1, 2026",
    image: leaderb,
    description: "Compete with learners from around the world. Earn XP, climb the ranks, and show off your language mastery on the new global leaderboards.",
    tag: "Feature"
  },
  {
    id: 3,
    title: "Community Events Coming Soon...",
    date: "January 25, 2026",
    image: community,
    description: "The community event is coming to you soon... Get ready to complete 30 lessons in 30 days!",
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