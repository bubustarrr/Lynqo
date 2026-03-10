import React from 'react';

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
    details: "New merchandise in the shop."
  }
];

const PatchNotesUpdates = () => {
  return (
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
        <div className="promo-card">
          <h3>Join the Discord!</h3>
          <p>Chat with other learners and developers.</p>
          {/* A button helyett <a> taget használunk a külső linkhez */}
          <a 
            href="https://discord.gg/QwGrCYnCAe" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="discord-btn"
          >
            Join Now
          </a>
        </div>
      </div>
    </aside>
  );
};

export default PatchNotesUpdates;