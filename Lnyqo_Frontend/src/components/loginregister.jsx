import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function LoginRegister() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { user, login, logout } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Registered! Now log in.");
  };

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.token) {
      // decode payload from JWT to get username + role
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      login({ id: payload.id, username: payload.username, role: payload.role }, data.token);
      alert("Login successful!");
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div style={{ border: "2px solid black", padding: "20px", marginTop: "20px" }}>
      {!user ? (
        <>
          <input name="username" placeholder="Username" onChange={handleChange} /><br />
          <input name="email" placeholder="Email" onChange={handleChange} /><br />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <p>Welcome, {user.username} ✅</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default LoginRegister;
