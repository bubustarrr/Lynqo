import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NavBar from './components/common/NavBar';
import ShopPage from './pages/ShopPage';
import NewsPage from './pages/NewsPage';
import SettingsPage from './pages/SettingsPage';
import Footer from "./components/common/Footer";
import LanguageCourses from './components/common/LanguageSelector';

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Show spinner for 1 second on every page change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Exactly 1 second

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <NavBar />
      
      {/* Full-screen Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <LoadingSpinner size="large" message="Loading Lynqo..." />
        </div>
      )}
      
      <main className="main-content">
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shop" element={<LanguageCourses />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}