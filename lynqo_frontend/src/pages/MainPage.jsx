import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={() => navigate('/register')}>
        Go to Register
      </button>
      <button onClick={() => navigate('/login')}>
        Go to Login
      </button>
    </div>
  );
}
