import React from 'react';
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>

      <Link to="/register">
        <button>Go to Register</button>
      </Link>

      <Link to="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
}
