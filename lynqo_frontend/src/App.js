import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext'; // Your updated one
import { GamificationProvider } from './context/GamificationContext'; // From earlier
import LoadingSpinner from './components/common/LoadingSpinner';
import NavBar from './components/common/NavBar';
import './App.css';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DashboardPage from './pages/DashboardPage'; // Add this
import LeaderboardPage from './pages/LeaderboardPage'; // Add this
import ShopPage from './pages/ShopPage';
import NewsPage from './pages/NewsPage';
import SettingsPage from './pages/SettingsPage';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) return <LoadingSpinner message="Checking auth..." />;
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Faster for auth
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <NavBar />
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
          <Route path="/shop" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <GamificationProvider>
        <AppContent />
      </GamificationProvider>
    </AuthProvider>
  );
}
