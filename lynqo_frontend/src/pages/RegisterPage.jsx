import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import './RegisterPage.css'; 

export default function RegisterPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. State Variables
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeEula: false,
    subscribeNews: false,
  });
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null); // Új state a sikeres üzenetnek
  const [isLoading, setIsLoading] = useState(false);

  // 2. Handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // 3. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    if (!form.agreeEula) {
      setError("You must agree to the Terms of Use.");
      setIsLoading(false);
      return;
    }

    try {
      // A. REGISTER
      const regRes = await fetch('https://localhost:7118/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        }),
      });

      if (!regRes.ok) {
        const errData = await regRes.json(); // Itt json()-t használunk, mert a backend JSON hibaüzenetet küld
        throw new Error(errData.error || 'Registration failed');
      }

      // Sikerült a regisztráció! Megvárjuk, amíg a backend válaszol
      const data = await regRes.json();
      
      // Kiírjuk a sikerüzenetet
      setSuccessMsg(data.message || "Registration successful! Please check your email to verify your account.");
      
      // Ürítjük a formot
      setForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeEula: false,
        subscribeNews: false,
      });

      // Pár másodperc múlva átirányítjuk a Login oldalra
      setTimeout(() => {
        navigate('/login'); 
      }, 5000); // 5 másodpercet vár, hogy a felhasználó elolvassa az üzenetet

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page-container">
      <Card className="register-card">
        <h2>Create Account</h2>
        
        {/* Alerts */}
        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
        {successMsg && <Alert variant="success" className="mb-3">{successMsg}<br/><small>Redirecting to login...</small></Alert>}

        {/* Ha sikerült regisztrálni, elrejtjük a formot */}
        {!successMsg && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="registerUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">Please enter a valid email address.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password (min. 6 characters)"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              id="agreeEula"
              name="agreeEula"
              label="I have read and accept the Terms of Use (EULA)"
              checked={form.agreeEula}
              onChange={handleChange}
              required
              className="mb-2"
            />

            <Form.Check
              type="checkbox"
              id="subscribeNews"
              name="subscribeNews"
              label="Subscribe to news and updates (optional)"
              checked={form.subscribeNews}
              onChange={handleChange}
              className="mb-4"
            />

            <Button className="register-button" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Register"}
            </Button>

            <div className="text-center mt-3">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login" className="text-primary fw-bold text-decoration-none">Log in</Link>
            </div>
          </Form>
        )}
      </Card>
    </div>
  );
}