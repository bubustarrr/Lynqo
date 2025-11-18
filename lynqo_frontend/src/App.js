import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // no Router here
import './App.css';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NavBar from './components/common/NavBar';
import ShopPage from './pages/ShopPage';
import NewsPage from './pages/NewsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Redirect root to /main */}
        <Route path="/" element={<Navigate to="/main" replace />} />
        {/* Catch-all redirects */}
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </div>
  );
}
