import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "2rem",
        padding: "1rem",
        borderTop: "1px solid #ccc",
        width: "100%",
        textAlign: "center",
      }}
    >
      <p>🌐 Connect with us:</p>
      <div
        style={{
          fontSize: "1.5rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          Twitter logo
        </a>
        <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
          Youtube logo
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
          Instagram logo
        </a>
      </div>
      <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
        © {new Date().getFullYear()} Lynqo. All rights reserved 2025.
      </p>
    </footer>
  );
}