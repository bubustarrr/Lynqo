import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import './LoginPage.css'; 

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Kiszedjük a tokent az URL-ből!
  
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('https://localhost:7118/api/Auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to reset password.');
      }

      setMessage("Password successfully reset! You can now log in.");
      setNewPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <Card className="login-card">
        <h2>Create New Password</h2>
        
        {!token && (
           <Alert variant="warning">No reset token found in the URL. Please click the link in your email again.</Alert>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {message ? (
           <div className="text-center">
             <Alert variant="success">{message}</Alert>
             <Link to="/login" className="btn btn-primary login-button mt-3">Go to Login</Link>
           </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="6"
                disabled={!token}
              />
            </Form.Group>

            <Button className="login-button mb-3" type="submit" disabled={isLoading || !token}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Save New Password"}
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
}