import React from "react";

function News() {
  return (
    <aside style={{ border: "2px solid black", width: "200px", padding: "10px" }}>
      <h3>News</h3>
      <ul>
        <li>📰 Lynqo 1.0 is live! We’re excited to announce the launch of Lynqo’s first version. Stay tuned for new features and improvements!</li>
        <li>⚡ Performance Upgrade Our developers have been working hard to make Lynqo faster and smoother. Enjoy an optimized experience across all devices.</li>
        <li>📰 Lynqo 1.0 is live! We’re excited to announce the launch of Lynqo’s first version. Stay tuned for new features and improvements!</li>
      </ul>
      <div style={{ borderTop: "1px solid black", marginTop: "10px", paddingTop: "5px" }}>
        More news
      </div>
    </aside>
  );
}

export default News;
