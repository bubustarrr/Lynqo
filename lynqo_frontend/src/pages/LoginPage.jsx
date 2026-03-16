import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import './LoginPage.css'; 

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // --- ÚJ ÁLLAPOTOK AZ EMAIL ÚJRAKÜLDÉSHEZ ---
  const [isUnverified, setIsUnverified] = useState(false);
  const [resendMessage, setResendMessage] = useState(null);
  const [isResending, setIsResending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsUnverified(false);
    setResendMessage(null);

    try {
      const res = await fetch('https://localhost:7118/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        
        // Ha az email nincs megerősítve, bekapcsoljuk az újraküldés gombot
        if (errData.error === "Please verify your email address first. Check your inbox!") {
           setIsUnverified(true);
        }
        throw new Error(errData.error || 'Login failed');
      }

      const data = await res.json();
      login(data);
      navigate('/pick-language');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- ÚJ METÓDUS: EMAIL ÚJRAKÜLDÉSE ---
  const handleResendVerification = async () => {
    setIsResending(true);
    setResendMessage(null);
    
    // Feltételezzük, hogy az "usernameOrEmail" mezőbe az emailjét írta. 
    // (Ha felhasználónevet írt, érdemes kérni, hogy írja be az emailt).
    try {
      const res = await fetch('https://localhost:7118/api/Auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.usernameOrEmail }),
      });
      
      if (!res.ok) throw new Error("Failed to resend. Please make sure you entered your email address in the field above.");
      
      setResendMessage("Verification email resent! Please check your inbox (and spam folder).");
      setIsUnverified(false); // Eltüntetjük a gombot siker után
    } catch(err) {
      setResendMessage(err.message);
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="login-page-container">
      <Card className="login-card">
        <h2>Welcome Back!</h2>
        
        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
        
        {/* SIKERES ÚJRAKÜLDÉS ÜZENETE */}
        {resendMessage && <Alert variant="info" className="mb-3">{resendMessage}</Alert>}

        {/* ÚJRAKÜLDÉS GOMB, HA NINCS MEGERŐSÍTVE */}
        {isUnverified && (
            <Button 
              variant="outline-primary" 
              className="w-100 mb-3" 
              onClick={handleResendVerification}
              disabled={isResending}
            >
              {isResending ? <Spinner animation="border" size="sm" /> : "📧 Resend Verification Email"}
            </Button>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginUsername">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              name="usernameOrEmail"
              placeholder="Enter your username or email"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* --- ÚJ LINK: ELFELEJTETT JELSZÓ --- */}
          <div className="text-end mb-4">
             <Link to="/forgot-password" className="text-primary text-decoration-none" style={{ fontSize: '0.9rem' }}>Forgot password?</Link>
          </div>

          <Button className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Log In"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/register" className="text-primary fw-bold text-decoration-none">Sign up</Link>
        </div>
      </Card>
    </div>
  );
}