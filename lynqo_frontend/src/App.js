import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Redirect root to /main */}
        <Route path="/" element={<Navigate to="/main" replace />} />
        {/* Catch-all redirects to /main or /login as desired */}
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </Router>
  );
}
