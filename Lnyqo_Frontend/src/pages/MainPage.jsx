import React, { useState, useEffect } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Description from "../components/description.jsx";
import News from "../components/news.jsx";
import LoginRegister from "../components/loginregister.jsx";

function MainPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <Header />
      <main style={{ display: "flex", justifyContent: "space-between" }}>
        <Description />
        <div style={{ textAlign: "center" }}>
          <h2>Az egy változó szöveg</h2>
          <LoginRegister />
        </div>
        <News />
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
