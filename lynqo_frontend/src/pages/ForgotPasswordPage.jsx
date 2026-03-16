import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import './LoginPage.css'; // Használjuk a Login oldal dizájnját!

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('https://localhost:7118/api/Auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to send reset email.');
      }

      const data = await res.json();
      setMessage(data.message); // "If the email exists, a reset link has been sent."
      setEmail(''); // Mező kiürítése
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <Card className="login-card">
        <h2>Reset Password</h2>
        <p className="text-center text-muted mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="forgotEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="login-button mb-3" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Send Reset Link"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Link to="/login" className="text-primary fw-bold text-decoration-none">
            ← Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
}