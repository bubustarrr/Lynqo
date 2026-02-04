import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import './LoginPage.css';

export default function LoginPage() {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '', rememberMe: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
    setError(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // 1. Call the Backend
      const res = await fetch('https://localhost:7118/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            usernameOrEmail: form.usernameOrEmail,
            password: form.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle specific ban messages or generic errors
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }

      // 2. Destructure the Correct Response Format
      // Backend returns: { token: "...", refreshToken: "...", user: { ... } }
      const { token, refreshToken, user: userData } = data;

      // 3. Login in Context
      // Only save RefreshToken if "Remember Me" is checked (optional logic, or always save it)
      const tokenToSave = form.rememberMe ? refreshToken : null; 
      
      login(userData, token, tokenToSave);

      navigate('/dashboard');
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="login-page-container">
      <Card className="login-card">
        <h2>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginUsernameOrEmail">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              name="usernameOrEmail"
              placeholder="Enter your username or email"
              value={form.usernameOrEmail}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            label="Remember me"
            checked={form.rememberMe}
            onChange={handleChange}
            className="mb-4"
            disabled={isLoading}
          />
          <Button className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
