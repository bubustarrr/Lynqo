import React from "react";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user } = useAuth();

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "2px solid black" }}>
      <div>{user ? user.username : "Guest"}</div>
      <h1>Lynqo</h1>
      <div>L/D Theme | Language</div>
    </header>
  );
}

export default Header;
