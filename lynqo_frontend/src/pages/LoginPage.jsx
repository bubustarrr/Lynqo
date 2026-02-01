import React, { useState, useContext, useEffect } from 'react'; 
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import './LoginPage.css';

export default function LoginPage() {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '', rememberMe: false });
  
  
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
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://localhost:7118/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      
      
      login(data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  
  if (user) {
      return null; 
  }

  return (
    <div className="login-page-container">
      <Card className="login-card">
        <h2>Login</h2>
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
          />
          <Button className="login-button" type="submit">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}