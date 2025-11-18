import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import './RegisterPage.css';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeEula: false,
    subscribeNews: false,
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!form.agreeEula) {
      alert('You must agree to the EULA to register');
      return;
    }
    try {
      const res = await fetch('https://localhost:7118/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      login(data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="register-page-container">
      <Card className="register-card">
        <h2>Create Account</h2>
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
          <Button className="register-button" type="submit">
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
}
