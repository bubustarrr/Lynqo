import React from "react";

function News() {
  return (
    <aside style={{ border: "2px solid black", width: "200px", padding: "10px" }}>
      <h3>News</h3>
      <ul>
        <li>First news item</li>
        <li>Second news item</li>
      </ul>
      <div style={{ borderTop: "1px solid black", marginTop: "10px", paddingTop: "5px" }}>
        More news
      </div>
    </aside>
  );
}

export default News;
