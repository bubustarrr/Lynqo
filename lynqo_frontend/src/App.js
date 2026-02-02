import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';


import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, AuthContext } from './context/AuthContext'; 


import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NavBar from './components/common/NavBar';
import ShopPage from './pages/ShopPage';
import NewsPage from './pages/NewsPage';
import SettingsPage from './pages/SettingsPage';
import Footer from "./components/common/Footer";
import LanguageCourses from './components/common/LanguageSelector';
import DashboardPage from './pages/DashboardPage';
import ShopLandingPage from './pages/ShopLandingPage';
import SubscriptionsPage from './pages/ShopPage';
import MerchPage from './pages/MerchPage';




const GuestRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};


const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/main" replace />;
  }
  return children;
};



function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

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
          
          
          <Route path="/register" element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          } />
          
          <Route path="/login" element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          } />

          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
           
          <Route path="/shop" element={
            <ProtectedRoute>
              <LanguageCourses /> 
            </ProtectedRoute>
          } />

          <Route path="/shoppage" element={
            <ProtectedRoute>
              <ShopLandingPage /> 
            </ProtectedRoute>
          } />

          <Route path="/shoppage/subscriptions" element={
            <ProtectedRoute>
              <ShopPage /> 
            </ProtectedRoute>
          } />

          <Route path="/shoppage/merch" element={
            <ProtectedRoute>
              <MerchPage /> 
            </ProtectedRoute>
          } />

          <Route path="/news" element={<NewsPage />} />

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
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}